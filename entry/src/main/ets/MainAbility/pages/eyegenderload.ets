import * as tf from "@ohos/tfjs"
import router from '@system.router'

let classes = ['Female','Male'];

function preprocess(x) {
  const arr_x = JSON.parse(JSON.stringify(x));
  var xt = []
  for(let i=0;i<1;i++){
    xt[i] = [];
    for(let j=0;j<64;j++){
      xt[i][j] = [];
      for(let k=0; k<64; k++){
        xt[i][j][k] = [];
        for(let l=0; l<1; l++){
          xt[i][j][k][l] = arr_x[i][j][k][l]
        }
      }
    }
  }
  var xf = tf.tensor(xt);
  return xf
}

@Entry
@Component
struct EyeGender {
  @State message: string = 'Gender from Eye'
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private settings2: RenderingContextSettings = new RenderingContextSettings(true)
  private context2: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings2)
  @State output: string = 'Output'
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
                this.model = await tf.loadLayersModel('/models/eyegender');
                console.log(String(this.model.inputs[0].shape))
                this.output =  "Model Loaded for inference"
              }
              catch(err){
                console.log("Error: " + err)
              }
            }).margin('5px')
        }
        Row() {
          Image($r("app.media.male_eye"))
            .objectFit(ImageFit.Cover)
            .width(100)
            .height(100)
            .margin('25px')
            .onClick(async() => {
              const predarr = await import('../../../resources/base/media/img1.json');
              const img1 = preprocess(predarr)
              console.log("Prediction Started")
              const pred = await this.model.predict(img1) as tf.Tensor;
              console.log("Prediction Complete")
              console.log('pred: ' + pred.dataSync())
              this.output = ''+classes[pred.dataSync()[0]]
            }).margin('5px')
        }
        Row() {
          Image($r("app.media.female_eye"))
            .objectFit(ImageFit.Cover)
            .width(100)
            .height(100)
            .margin('25px')
            .onClick(async() => {
              const predarr = await import('../../../resources/base/media/img2.json');
              const img2 = preprocess(predarr)
              console.log("Prediction Started")
              const pred = await this.model.predict(img2) as tf.Tensor;
              console.log("Prediction Complete")
              console.log('pred: ' + pred.dataSync())
              this.output = ''+classes[pred.dataSync()[0]]
            }).margin('5px')
        }
        Text(this.output)
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