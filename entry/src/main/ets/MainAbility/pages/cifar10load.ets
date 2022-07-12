import * as tf from "@ohos/tfjs"
import router from '@system.router'

import * as xTest from './../../../resources/base/media/cifar_test_features.json';
import * as yTest from './../../../resources/base/media/cifar_test_targets.json';

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
  @State message: string = 'CIFAR10 Model Load'
  @State input: string = 'Input'
  private model: tf.LayersModel;
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
        Row() {
          Button("Load")
            .onClick(async() => {
              console.log("Started loading the model");
              try {
                this.model = await tf.loadLayersModel('/models/cifar10');
                console.log(String(this.model.inputs[0].shape))
                this.input =  "Model Loaded for inference"
              }
              catch(err){
                console.log("Error: " + err)
              }
            }).margin('5px')
          Button("Test") //Press to test after loading
            .onClick(async() => {
              try{
                console.log("Test")
                const [xtest,ytest] = preprocess(xTest,yTest)
                console.log(String(xtest.shape))
                console.log(String(ytest.shape))
                const yt = tf.argMax(ytest,-1)
                console.log(String(yt.dataSync()))
                const predictOut = await this.model.predict(xtest) as tf.Tensor;
                const yp = tf.argMax(predictOut,-1)
                console.log(String(yp.dataSync()))
                const acc = tf.sum(tf.metrics.categoricalAccuracy(ytest,predictOut));
                this.input =  "test accuracy: "+acc.dataSync()[0]/100;
              }
              catch(err){
                console.log("Error: " + err)
              }
            }).margin('25px')
        }
        Text(this.input)
          .fontSize(30)
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
