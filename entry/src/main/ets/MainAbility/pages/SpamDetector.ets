import * as tf from "@ohos/tfjs"
import router from '@system.router';
import * as dict from '../common/dictionary'

function tokenize(wordArray) : tf.Tensor{
  let returnArray = [dict.START];

  // Loop through the words in the sentence we want to encode.
  // If word is found in dict, add that number else
  // we add the UNKNOWN token.
  let ENCODING_LENGTH = 0
  for (var i = 0; i < wordArray.length; i++) {
    let encoding = dict.LOOKUP[wordArray[i]];
    returnArray.push(encoding === undefined ? dict.UNKNOWN : encoding);
    ENCODING_LENGTH += 1;
  }

  // Finally if the number of words was < the minimum encoding length
  // minus 1 (due to the start token), fill the rest with PAD tokens.
  while (i < 19) {
    returnArray.push(dict.PAD);
    i++;
  }

  // Log the result to see what we made.
//  console.log(""+[returnArray]);

  // Convert to a TensorFlow Tensor and return that.
  return tf.tensor([returnArray]);

}

@Entry
@Component
struct SpamDetector {
  @State message: string = 'Spam Detector'
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
              const model = await tf.loadLayersModel('/models/spam');
              const xtext = ['I','love','my','dog'];
              const xtest = tokenize(xtext);
              // https://tfhub.dev/tensorflow/tfjs-model/tutorials/spam-detection/tfjs/1
//              const result = model.predict(tf.tensor([[1,3,12,18,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])) as tf.Tensor;
              const result = model.predict(xtest) as tf.Tensor;
              this.input = 'Inputs : ' + xtext;
              this.output = 'Predictions are: Not Spam:'+ result.dataSync()[0].toFixed(3)+' Spam: '+result.dataSync()[1].toFixed(3);
              console.log('Predictions are: '+ result.dataSync())
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