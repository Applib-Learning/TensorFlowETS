import * as tf from "@ohos/tfjs"
import router from '@system.router'

import * as xTrain from './../../../resources/base/media/cifar10_train_features.json';
import * as yTrain from './../../../resources/base/media/cifar10_train_targets.json';
import * as xTest from "./../../../resources/base/media/cifar10_test_features.json";
import * as yTest from "./../../../resources/base/media/cifar10_test_targets.json";

let model = tf.sequential();

async function train(xtrain, ytrain){
  model.add(tf.layers.conv2d({inputShape: [32, 32, 3], kernelSize: 3, filters: 16, activation: 'relu' }));
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  model.add(tf.layers.flatten({}));
  model.add(tf.layers.dense({units: 64, activation: 'relu'}));
  model.add(tf.layers.dropout({rate: 0.3}));
  model.add(tf.layers.dense({units: 32, activation: 'relu'}));
  model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
  console.log("Training Started")
  function onEpochEnd(epoch, logs) {
    console.log('Accuracy '+String(logs.acc));
    console.log('Val Accuracy '+String(logs.val_acc));
  }
  model.compile({optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'],});
  const history = await model.fit(xtrain, ytrain, {epochs: 20, validationSplit: 0.15,callbacks: {onEpochEnd},verbose:1});
  console.log("Training complete")
}

function preprocess(x,y,m=100) {
  const arr_x = JSON.parse(JSON.stringify(x));
  const arr_y = JSON.parse(JSON.stringify(y));
  // arr[1]
  var xt = []
  var yt = []
  for(let i=0;i<m;i++){
    xt[i] = [];
    yt[i] = arr_y[i];
    for(let j=0;j<32;j++){
      xt[i][j] = [];
      for(let k=0; k<32; k++){
        xt[i][j][k] = [];
        for(let l=0; l<3; l++){
          xt[i][j][k][l] = arr_x[i][j][k][l]
        }
      }
    }
  }
  var xf = tf.tensor(xt);
  var yf = tf.tensor(yt);
  return [xf,yf]
}

@Entry
@Component
struct Xor {
  @State message: string = 'CIFAR10 Model'
  @State input: string = 'Input'
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
        Row() {
          Button("Train")
            .onClick(() => {
              const [xtrain,ytrain] = preprocess(xTrain,yTrain);
              train(xtrain,ytrain);
              this.input =  "Training Complete"
            }).margin('5px')
          Button("Test")//Press to predict after training
            .onClick(() => {
              console.log("Test")
              const [xtest,ytest] = preprocess(xTest,yTest,10)
              const predictOut = model.predict(xtest) as tf.Tensor;
              const yt = tf.argMax(ytest,-1)
              const yp = tf.argMax(predictOut,-1)
              console.log(String(ytest.dataSync()))
              console.log(String(predictOut.dataSync()))
              console.log(String(yp.dataSync()))
              console.log(String(yt.dataSync()))
              this.input =  "test accuracy: "+tf.metrics.categoricalAccuracy(yt,yp).dataSync();
            }).margin('25px')
        }
        Text(this.input)
          .fontSize(20)
          .fontWeight(FontWeight.Normal)
        Button("Back")
          .onClick(()=>{
            console.log("back")
            router.back();
          })
          .margin(40)
      }
      .width('100%')
    }
    .height('100%')
  }
}