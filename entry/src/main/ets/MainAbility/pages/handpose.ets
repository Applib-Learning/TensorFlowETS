import * as tf from "@ohos/tfjs"
import router from '@system.router';

@Entry
@Component
struct FindHand {
  @State message: string = 'handpose'
  @State input: string = 'Input'
  @State output: string = 'Output'
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Row(){
          Button("Load")
            .onClick(async() => {
              console.log("Started loading the model");
              const model = await tf.loadGraphModel('/models/handpose');
              console.log("model loaded");
              model.inputs[0].shape;
              // https://tfhub.dev/mediapipe/tfjs-model/handpose/1/default/2
              const hand = await import('../../../resources/base/media/hand_image.json');
              console.log("1 0");
              const handarr = [];
              handarr[0] = [];
              for(let i = 0;i<192;i++){
                handarr[0][i]=[]
                for(let j = 0;j<192;j++) {
                  handarr[0][i][j] = [];
                  handarr[0][i][j][0] = hand[i][j][0]/255;
                  handarr[0][i][j][1] = hand[i][j][1]/255;
                  handarr[0][i][j][2] = hand[i][j][2]/255;
                }
              }
              //              const testing= tf.zeros([-1,192,192,3]);
              console.log("1 1");
              const predx =model.inputs[0].shape;
              const predy =model.outputs[0].shape;
              console.log('input '+predx);
              console.log('output' +predy);
              console.log("prediction started")
              const pred = await model.predict(tf.zeros([1,192,192,3])) as tf.Tensor;
              //prediction is not working
              //              const pred = await model.predict(tf.tensor(handarr)) as tf.Tensor;
              // TODO
              const inputs = await model.inputs[0].shape;
              const outputs = await model.outputs[0].shape;
              console.log('Input and Output shapes are: '+ inputs+ " and "+outputs);
              console.log('Pred: ' + pred.dataSync())
              console.log("Loaded the model");
            }).margin('25px')
          Button("Test") //Press to predict after training
            .onClick(() => {
            }).margin('25px')
        }
        Text(this.input)
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
        Text(this.output)
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
        Button("Back")
          .onClick(()=>{
            router.back();
          })
          .margin(40)
      }
      .width('100%')
    }
    .height('100%')
  }
}