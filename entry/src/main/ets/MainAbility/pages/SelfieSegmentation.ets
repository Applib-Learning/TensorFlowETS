import * as tf from "@ohos/tfjs"
import router from '@system.router';

@Entry
@Component
struct SelfieSegmentation {
  @State message: string = 'Selfie-Segmentation'
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
              const model = await tf.loadGraphModel('/models/segmentation');
              // https://tfhub.dev/mediapipe/tfjs-model/iris/1/default/2
              const face = await import('../../../resources/base/media/segmentation.json');
              const facearr = [];
              facearr[0] = [];
              for(let i = 0;i<144;i++){
                facearr[0][i]=[]
                for(let j = 0;j<256;j++) {
                  facearr[0][i][j] = [];
                  facearr[0][i][j][0] = face[i][j][0]/255;
                  facearr[0][i][j][1] = face[i][j][1]/255;
                  facearr[0][i][j][2] = face[i][j][2]/255;
                }
              }
//               const pred = await model.predict(tf.zeros([1,144,256,3])) as tf.Tensor;
              const pred = await model.predict(tf.tensor(facearr)) as tf.Tensor;
              const inputs = await model.inputs[0].shape;
              const outputs = await model.outputs[0].shape;
              console.log('Input and Output shapes are: '+ inputs+ " and "+outputs);
              let k = 0;
              let op = []
              for(let i=0;i<144;i++){
                op[i] = []
                let str = ""
                for(let j=0;j<256;j++){
                  op[i][j] = pred.dataSync()[k]
                  str += (pred.dataSync()[k]+",");
                  k++;
                }
                console.log(str)
              }
              console.log('Pred: ')
//              console.log(op)
//              console.log("pred.dataSync: "+pred.dataSync())
//              console.log(str);
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