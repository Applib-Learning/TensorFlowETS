import * as tf from "@ohos/tfjs"
import router from '@system.router';

@Entry
@Component
struct SelfieSegmentation {
  @State message: string = 'Selfie\nSegmentation'
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private settings2: RenderingContextSettings = new RenderingContextSettings(true)
  private context2: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings2)
  private model: tf.GraphModel;
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Row(){
          Button("Load")
            .onClick(async() => {
              console.log("Loading the model");
              this.model = await tf.loadGraphModel('/models/segmentation');
              console.log("Loaded the model");
            }).margin('25px')
          Button("Back")
            .onClick(async()=>{
              router.back();
            })
            .margin('25px')
        }
        Row(){
        Image($r("app.media.segmentation_img"))
          .height(px2vp(144))
          .width(px2vp(256))
          .margin('25px')
        Canvas(this.context)
          .width(px2vp(256))
          .height(px2vp(144))
          .onReady(async() =>{
            var imageData = this.context.createImageData(px2vp(256),px2vp(144))
            for (var i = 0; i < imageData.data.length; i += 4) {
              imageData.data[i + 0] = 255
              imageData.data[i + 1] = 0
              imageData.data[i + 2] = 255
              imageData.data[i + 3] = 255
            }
            this.context.putImageData(imageData, 0, 0)
          })
          .onClick(async() =>{
            var imageData = this.context.createImageData(px2vp(256),px2vp(144))
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
            console.log("Prediction Started")
            const pred = await this.model.predict(tf.tensor(facearr)) as tf.Tensor;
            let k = 0;
            let op = []
            for(let i=0;i<144;i++){
              op[i] = []
              for(let j=0;j<256;j++){
                op[i][j] = pred.dataSync()[k]
                k++;
              }
            }
            k =0;
            for(let i = 0;i<144;i++){
              for(let j = 0;j<256;j++) {
                imageData.data[k + 0] = face[i][j][0]*op[i][j]
                imageData.data[k + 1] = face[i][j][1]*op[i][j]
                imageData.data[k + 2] = face[i][j][2]*op[i][j]
                imageData.data[k + 3] = 255
                k+=4
              }
            }
            console.log("Prediction Complete")
            this.context.putImageData(imageData, 0, 0)
          })
        }
        Row(){
          Image($r("app.media.selfiee2_img"))
            .height(px2vp(144))
            .width(px2vp(256))
            .margin('25px')
          Canvas(this.context2)
            .width(px2vp(256))
            .height(px2vp(144))
            .onReady(async() =>{
              var imageData = this.context2.createImageData(px2vp(256),px2vp(144))
              for (var i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i + 0] = 255
                imageData.data[i + 1] = 0
                imageData.data[i + 2] = 255
                imageData.data[i + 3] = 255
              }
              this.context2.putImageData(imageData, 0, 0)
            })
            .onClick(async() =>{
              var imageData = this.context2.createImageData(px2vp(256),px2vp(144))
              const face = await import('../../../resources/base/media/selfiee2.json');
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
              console.log("Prediction Started")
              const pred = await this.model.predict(tf.tensor(facearr)) as tf.Tensor;
              let k = 0;
              let op = []
              for(let i=0;i<144;i++){
                op[i] = []
                for(let j=0;j<256;j++){
                  op[i][j] = pred.dataSync()[k]
                  k++;
                }
              }
              k =0;
              for(let i = 0;i<144;i++){
                for(let j = 0;j<256;j++) {
                  imageData.data[k + 0] = face[i][j][0]*op[i][j]
                  imageData.data[k + 1] = face[i][j][1]*op[i][j]
                  imageData.data[k + 2] = face[i][j][2]*op[i][j]
                  imageData.data[k + 3] = 255
                  k+=4
                }
              }
              console.log("Prediction Complete")
              this.context2.putImageData(imageData, 0, 0)
            })
        }
        Text("Press load for loading the model and click the pink image for Segmentation")
          .fontSize(15)
          .margin('25px')
      }
      .width('100%')

    }
    .height('100%')
  }
}

