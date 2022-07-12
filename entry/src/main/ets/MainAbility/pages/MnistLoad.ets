import * as tf from "@ohos/tfjs"
import router from '@system.router';

let model;
/* https://colab.research.google.com/drive/1NWEP3RQGTIeNtIntfdUKsWCH1mpIIXp7?usp=sharing
  Model is trained in Colab and is converted to json format using tfjs_converter
*/

@Entry
@Component
struct MobileNet {
  @State message: string = 'Handwritten Digit Detection'
  @State digit: string = 'Predicted digit: '
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
              model = await tf.loadLayersModel('/models/mnist');
              console.log("Loaded model")

            }).margin('25px')
        }
        Row() {
          Image($r("app.media.Two"))
            .objectFit(ImageFit.Cover)
            .width(50)
            .height(50)
            .margin('25px')
            .onClick(async() => {

              const predarr = await import('../../../resources/base/media/two.json');

              const digit = [];
              for(let i=0; i<1 ; i++){
                digit[i] = [];
                for(let j=0;j<28;j++){
                  digit[i][j] = [];
                  for(let k=0; k<28; k++){
                    digit[i][j][k] = [];
                    for(let l=0; l<1; l++){
                      digit[i][j][k][l] = predarr[i][j][k][l]
                    }
                  }
                }
              }
              console.log("Prediction Started")
              const pred = await model.predict(tf.tensor(digit)) as tf.Tensor;
              console.log("Predict Complete")
              console.log('pred: ' + pred.dataSync())

              try {
                const index = await pred.as1D().argMax() as tf.Tensor;
                console.log("Predicted Digit: " + index.dataSync())
                this.digit = "Prediceted Digit: " + index.dataSync()
              }
              catch(err){
                console.log("Error: " + err)
              }
            })
          Image($r("app.media.Seven"))
            .objectFit(ImageFit.Cover)
            .width(50)
            .height(50)
            .margin('25px')
            .onClick(async() => {

              const predarr = await import('../../../resources/base/media/seven.json');

              const digit = [];
              for(let i=0; i<1 ; i++){
                digit[i] = [];
                for(let j=0;j<28;j++){
                  digit[i][j] = [];
                  for(let k=0; k<28; k++){
                    digit[i][j][k] = [];
                    for(let l=0; l<1; l++){
                      digit[i][j][k][l] = predarr[i][j][k][l]
                    }
                  }
                }
              }
              console.log("Prediction Started")
              const pred = await model.predict(tf.tensor(digit)) as tf.Tensor;
              console.log("Predict Complete")
              console.log('pred: ' + pred.dataSync())

              try {
                const index = await pred.as1D().argMax() as tf.Tensor;
                console.log("Predicted Digit: " + index.dataSync())
                this.digit = "Prediceted Digit: " + index.dataSync()
              }
              catch(err){
                console.log("Error: " + err)
              }
            })
          Image($r("app.media.One"))
            .objectFit(ImageFit.Cover)
            .width(50)
            .height(50)
            .margin('25px')
            .onClick(async() => {

              const predarr = await import('../../../resources/base/media/one.json');

              const digit = [];
              for(let i=0; i<1 ; i++){
                digit[i] = [];
                for(let j=0;j<28;j++){
                  digit[i][j] = [];
                  for(let k=0; k<28; k++){
                    digit[i][j][k] = [];
                    for(let l=0; l<1; l++){
                      digit[i][j][k][l] = predarr[i][j][k][l]
                    }
                  }
                }
              }
              console.log("Prediction Started")
              const pred = await model.predict(tf.tensor(digit)) as tf.Tensor;
              console.log("Predict Complete")
              console.log('pred: ' + pred.dataSync())

              try {
                const index = await pred.as1D().argMax() as tf.Tensor;
                console.log("Predicted Digit: " + index.dataSync())
                this.digit = "Prediceted Digit: " + index.dataSync()
              }
              catch(err){
                console.log("Error: " + err)
              }
            })
        }
        Text(this.digit)
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