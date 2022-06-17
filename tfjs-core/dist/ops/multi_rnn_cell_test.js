/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '../index';
import { ALL_ENVS, describeWithFlags } from '../jasmine_util';
import { expectArraysClose } from '../test_util';
describeWithFlags('lstm', ALL_ENVS, () => {
    it('MultiRNNCell with 2 BasicLSTMCells', async () => {
        const lstmKernel1 = tf.tensor2d([
            0.26242125034332275, -0.8787832260131836, 0.781475305557251,
            1.337337851524353, 0.6180247068405151, -0.2760246992111206,
            -0.11299663782119751, -0.46332040429115295, -0.1765323281288147,
            0.6807947158813477, -0.8326982855796814, 0.6732975244522095
        ], [3, 4]);
        const lstmBias1 = tf.tensor1d([1.090713620185852, -0.8282332420349121, 0, 1.0889357328414917]);
        const lstmKernel2 = tf.tensor2d([
            -1.893059492111206, -1.0185645818710327, -0.6270437240600586,
            -2.1829540729522705, -0.4583775997161865, -0.5454602241516113,
            -0.3114445209503174, 0.8450229167938232
        ], [2, 4]);
        const lstmBias2 = tf.tensor1d([0.9906240105628967, 0.6248329877853394, 0, 1.0224634408950806]);
        const forgetBias = tf.scalar(1.0);
        const lstm1 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        const lstm2 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        const c = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        const h = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        const onehot = tf.buffer([1, 2], 'float32');
        onehot.set(1.0, 0, 0);
        const output = tf.multiRNNCell([lstm1, lstm2], onehot.toTensor(), c, h);
        expectArraysClose(await output[0][0].data(), [-0.7440074682235718]);
        expectArraysClose(await output[0][1].data(), [0.7460772395133972]);
        expectArraysClose(await output[1][0].data(), [-0.5802832245826721]);
        expectArraysClose(await output[1][1].data(), [0.5745711922645569]);
    });
});
describeWithFlags('multiRNN throws when passed non-tensor', ALL_ENVS, () => {
    it('input: data', () => {
        const lstmKernel1 = tf.zeros([3, 4]);
        const lstmBias1 = tf.zeros([4]);
        const lstmKernel2 = tf.zeros([2, 4]);
        const lstmBias2 = tf.zeros([4]);
        const forgetBias = tf.scalar(1.0);
        const lstm1 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        const lstm2 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        const c = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        const h = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        expect(() => tf.multiRNNCell([lstm1, lstm2], {}, c, h))
            .toThrowError(/Argument 'data' passed to 'multiRNNCell' must be a Tensor/);
    });
    it('input: c', () => {
        const lstmKernel1 = tf.zeros([3, 4]);
        const lstmBias1 = tf.zeros([4]);
        const lstmKernel2 = tf.zeros([2, 4]);
        const lstmBias2 = tf.zeros([4]);
        const forgetBias = tf.scalar(1.0);
        const lstm1 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        const lstm2 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        const h = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        const data = tf.zeros([1, 2]);
        expect(() => tf.multiRNNCell([lstm1, lstm2], data, [{}], h))
            .toThrowError(/Argument 'c\[0\]' passed to 'multiRNNCell' must be a Tensor/);
    });
    it('input: h', () => {
        const lstmKernel1 = tf.zeros([3, 4]);
        const lstmBias1 = tf.zeros([4]);
        const lstmKernel2 = tf.zeros([2, 4]);
        const lstmBias2 = tf.zeros([4]);
        const forgetBias = tf.scalar(1.0);
        const lstm1 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        const lstm2 = (data, c, h) => tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        const c = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        const data = tf.zeros([1, 2]);
        expect(() => tf.multiRNNCell([lstm1, lstm2], data, c, [{}]))
            .toThrowError(/Argument 'h\[0\]' passed to 'multiRNNCell' must be a Tensor/);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlfcm5uX2NlbGxfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29yZS9zcmMvb3BzL211bHRpX3Jubl9jZWxsX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTVELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUcvQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDM0I7WUFDRSxtQkFBbUIsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQjtZQUMzRCxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLGtCQUFrQjtZQUMxRCxDQUFDLG1CQUFtQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxrQkFBa0I7WUFDL0Qsa0JBQWtCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0I7U0FDNUQsRUFDRCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDekIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDM0I7WUFDRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxrQkFBa0I7WUFDNUQsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGtC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XG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQgKiBhcyB0ZiBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQge0FMTF9FTlZTLCBkZXNjcmliZVdpdGhGbGFnc30gZnJvbSAnLi4vamFzbWluZV91dGlsJztcbmltcG9ydCB7VGVuc29yMkR9IGZyb20gJy4uL3RlbnNvcic7XG5pbXBvcnQge2V4cGVjdEFycmF5c0Nsb3NlfSBmcm9tICcuLi90ZXN0X3V0aWwnO1xuaW1wb3J0IHtSYW5rfSBmcm9tICcuLi90eXBlcyc7XG5cbmRlc2NyaWJlV2l0aEZsYWdzKCdsc3RtJywgQUxMX0VOVlMsICgpID0+IHtcbiAgaXQoJ011bHRpUk5OQ2VsbCB3aXRoIDIgQmFzaWNMU1RNQ2VsbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbHN0bUtlcm5lbDEgPSB0Zi50ZW5zb3IyZChcbiAgICAgICAgW1xuICAgICAgICAgIDAuMjYyNDIxMjUwMzQzMzIyNzUsIC0wLjg3ODc4MzIyNjAxMzE4MzYsIDAuNzgxNDc1MzA1NTU3MjUxLFxuICAgICAgICAgIDEuMzM3MzM3ODUxNTI0MzUzLCAwLjYxODAyNDcwNjg0MDUxNTEsIC0wLjI3NjAyNDY5OTIxMTEyMDYsXG4gICAgICAgICAgLTAuMTEyOTk2NjM3ODIxMTk3NTEsIC0wLjQ2MzMyMDQwNDI5MTE1Mjk1LCAtMC4xNzY1MzIzMjgxMjg4MTQ3LFxuICAgICAgICAgIDAuNjgwNzk0NzE1ODgxMzQ3NywgLTAuODMyNjk4Mjg1NTc5NjgxNCwgMC42NzMyOTc1MjQ0NTIyMDk1XG4gICAgICAgIF0sXG4gICAgICAgIFszLCA0XSk7XG4gICAgY29uc3QgbHN0bUJpYXMxID0gdGYudGVuc29yMWQoXG4gICAgICAgIFsxLjA5MDcxMzYyMDE4NTg1MiwgLTAuODI4MjMzMjQyMDM0OTEyMSwgMCwgMS4wODg5MzU3MzI4NDE0OTE3XSk7XG4gICAgY29uc3QgbHN0bUtlcm5lbDIgPSB0Zi50ZW5zb3IyZChcbiAgICAgICAgW1xuICAgICAgICAgIC0xLjg5MzA1OTQ5MjExMTIwNiwgLTEuMDE4NTY0NTgxODcxMDMyNywgLTAuNjI3MDQzNzI0MDYwMDU4NixcbiAgICAgICAgICAtMi4xODI5NTQwNzI5NTIyNzA1LCAtMC40NTgzNzc1OTk3MTYxODY1LCAtMC41NDU0NjAyMjQxNTE2MTEzLFxuICAgICAgICAgIC0wLjMxMTQ0NDUyMDk1MDMxNzQsIDAuODQ1MDIyOTE2NzkzODIzMlxuICAgICAgICBdLFxuICAgICAgICBbMiwgNF0pO1xuICAgIGNvbnN0IGxzdG1CaWFzMiA9IHRmLnRlbnNvcjFkKFxuICAgICAgICBbMC45OTA2MjQwMTA1NjI4OTY3LCAwLjYyNDgzMjk4Nzc4NTMzOTQsIDAsIDEuMDIyNDYzNDQwODk1MDgwNl0pO1xuXG4gICAgY29uc3QgZm9yZ2V0QmlhcyA9IHRmLnNjYWxhcigxLjApO1xuICAgIGNvbnN0IGxzdG0xID0gKGRhdGE6IFRlbnNvcjJELCBjOiBUZW5zb3IyRCwgaDogVGVuc29yMkQpID0+XG4gICAgICAgIHRmLmJhc2ljTFNUTUNlbGwoZm9yZ2V0QmlhcywgbHN0bUtlcm5lbDEsIGxzdG1CaWFzMSwgZGF0YSwgYywgaCk7XG4gICAgY29uc3QgbHN0bTIgPSAoZGF0YTogVGVuc29yMkQsIGM6IFRlbnNvcjJELCBoOiBUZW5zb3IyRCkgPT5cbiAgICAgICAgdGYuYmFzaWNMU1RNQ2VsbChmb3JnZXRCaWFzLCBsc3RtS2VybmVsMiwgbHN0bUJpYXMyLCBkYXRhLCBjLCBoKTtcbiAgICBjb25zdCBjID0gW1xuICAgICAgdGYuemVyb3M8UmFuay5SMj4oWzEsIGxzdG1CaWFzMS5zaGFwZVswXSAvIDRdKSxcbiAgICAgIHRmLnplcm9zPFJhbmsuUjI+KFsxLCBsc3RtQmlhczIuc2hhcGVbMF0gLyA0XSlcbiAgICBdO1xuICAgIGNvbnN0IGggPSBbXG4gICAgICB0Zi56ZXJvczxSYW5rLlIyPihbMSwgbHN0bUJpYXMxLnNoYXBlWzBdIC8gNF0pLFxuICAgICAgdGYuemVyb3M8UmFuay5SMj4oWzEsIGxzdG1CaWFzMi5zaGFwZVswXSAvIDRdKVxuICAgIF07XG5cbiAgICBjb25zdCBvbmVob3QgPSB0Zi5idWZmZXI8UmFuay5SMj4oWzEsIDJdLCAnZmxvYXQzMicpO1xuICAgIG9uZWhvdC5zZXQoMS4wLCAwLCAwKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IHRmLm11bHRpUk5OQ2VsbChbbHN0bTEsIGxzdG0yXSwgb25laG90LnRvVGVuc29yKCksIGMsIGgpO1xuXG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgb3V0cHV0WzBdWzBdLmRhdGEoKSwgWy0wLjc0NDAwNzQ2ODIyMzU3MThdKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCBvdXRwdXRbMF1bMV0uZGF0YSgpLCBbMC43NDYwNzcyMzk1MTMzOTcyXSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgb3V0cHV0WzFdWzBdLmRhdGEoKSwgWy0wLjU4MDI4MzIyNDU4MjY3MjFdKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCBvdXRwdXRbMV1bMV0uZGF0YSgpLCBbMC41NzQ1NzExOTIyNjQ1NTY5XSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlV2l0aEZsYWdzKCdtdWx0aVJOTiB0aHJvd3Mgd2hlbiBwYXNzZWQgbm9uLXRlbnNvcicsIEFMTF9FTlZTLCAoKSA9PiB7XG4gIGl0KCdpbnB1dDogZGF0YScsICgpID0+IHtcbiAgICBjb25zdCBsc3RtS2VybmVsMTogdGYuVGVuc29yMkQgPSB0Zi56ZXJvcyhbMywgNF0pO1xuICAgIGNvbnN0IGxzdG1CaWFzMTogdGYuVGVuc29yMUQgPSB0Zi56ZXJvcyhbNF0pO1xuICAgIGNvbnN0IGxzdG1LZXJuZWwyOiB0Zi5UZW5zb3IyRCA9IHRmLnplcm9zKFsyLCA0XSk7XG4gICAgY29uc3QgbHN0bUJpYXMyOiB0Zi5UZW5zb3IxRCA9IHRmLnplcm9zKFs0XSk7XG5cbiAgICBjb25zdCBmb3JnZXRCaWFzID0gdGYuc2NhbGFyKDEuMCk7XG4gICAgY29uc3QgbHN0bTEgPSAoZGF0YTogVGVuc29yMkQsIGM6IFRlbnNvcjJELCBoOiBUZW5zb3IyRCkgPT5cbiAgICAgICAgdGYuYmFzaWNMU1RNQ2VsbChmb3JnZXRCaWFzLCBsc3RtS2VybmVsMSwgbHN0bUJpYXMxLCBkYXRhLCBjLCBoKTtcbiAgICBjb25zdCBsc3RtMiA9IChkYXRhOiBUZW5zb3IyRCwgYzogVGVuc29yMkQsIGg6IFRlbnNvcjJEKSA9PlxuICAgICAgICB0Zi5iYXNpY0xTVE1DZWxsKGZvcmdldEJpYXMsIGxzdG1LZXJuZWwyLCBsc3RtQmlhczIsIGRhdGEsIGMsIGgpO1xuICAgIGNvbnN0IGMgPSBbXG4gICAgICB0Zi56ZXJvczxSYW5rLlIyPihbMSwgbHN0bUJpYXMxLnNoYXBlWzBdIC8gNF0pLFxuICAgICAgdGYuemVyb3M8UmFuay5SMj4oWzEsIGxzdG1CaWFzMi5zaGFwZVswXSAvIDRdKVxuICAgIF07XG4gICAgY29uc3QgaCA9IFtcbiAgICAgIHRmLnplcm9zPFJhbmsuUjI+KFsxLCBsc3RtQmlhczEuc2hhcGVbMF0gLyA0XSksXG4gICAgICB0Zi56ZXJvczxSYW5rLlIyPihbMSwgbHN0bUJpYXMyLnNoYXBlWzBdIC8gNF0pXG4gICAgXTtcblxuICAgIGV4cGVjdCgoKSA9PiB0Zi5tdWx0aVJOTkNlbGwoW2xzdG0xLCBsc3RtMl0sIHt9IGFzIHRmLlRlbnNvcjJELCBjLCBoKSlcbiAgICAgICAgLnRvVGhyb3dFcnJvcihcbiAgICAgICAgICAgIC9Bcmd1bWVudCAnZGF0YScgcGFzc2VkIHRvICdtdWx0aVJOTkNlbGwnIG11c3QgYmUgYSBUZW5zb3IvKTtcbiAgfSk7XG5cbiAgaXQoJ2lucHV0OiBjJywgKCkgPT4ge1xuICAgIGNvbnN0IGxzdG1LZXJuZWwxOiB0Zi5UZW5zb3IyRCA9IHRmLnplcm9zKFszLCA0XSk7XG4gICAgY29uc3QgbHN0bUJpYXMxOiB0Zi5UZW5zb3IxRCA9IHRmLnplcm9zKFs0XSk7XG4gICAgY29uc3QgbHN0bUtlcm5lbDI6IHRmLlRlbnNvcjJEID0gdGYuemVyb3MoWzIsIDRdKTtcbiAgICBjb25zdCBsc3RtQmlhczI6IHRmLlRlbnNvcjFEID0gdGYuemVyb3MoWzRdKTtcblxuICAgIGNvbnN0IGZvcmdldEJpYXMgPSB0Zi5zY2FsYXIoMS4wKTtcbiAgICBjb25zdCBsc3RtMSA9IChkYXRhOiBUZW5zb3IyRCwgYzogVGVuc29yMkQsIGg6IFRlbnNvcjJEKSA9PlxuICAgICAgICB0Zi5iYXNpY0xTVE1DZWxsKGZvcmdldEJpYXMsIGxzdG1LZXJuZWwxLCBsc3RtQmlhczEsIGRhdGEsIGMsIGgpO1xuICAgIGNvbnN0IGxzdG0yID0gKGRhdGE6IFRlbnNvcjJELCBjOiBUZW5zb3IyRCwgaDogVGVuc29yMkQpID0+XG4gICAgICAgIHRmLmJhc2ljTFNUTUNlbGwoZm9yZ2V0QmlhcywgbHN0bUtlcm5lbDIsIGxzdG1CaWFzMiwgZGF0YSwgYywgaCk7XG5cbiAgICBjb25zdCBoID0gW1xuICAgICAgdGYuemVyb3M8UmFuay5SMj4oWzEsIGxzdG1CaWFzMS5zaGFwZVswXSAvIDRdKSxcbiAgICAgIHRmLnplcm9zPFJhbmsuUjI+KFsxLCBsc3RtQmlhczIuc2hhcGVbMF0gLyA0XSlcbiAgICBdO1xuICAgIGNvbnN0IGRhdGE6IHRmLlRlbnNvcjJEID0gdGYuemVyb3MoWzEsIDJdKTtcblxuICAgIGV4cGVjdCgoKSA9PiB0Zi5tdWx0aVJOTkNlbGwoW2xzdG0xLCBsc3RtMl0sIGRhdGEsIFt7fSBhcyB0Zi5UZW5zb3IyRF0sIGgpKVxuICAgICAgICAudG9UaHJvd0Vycm9yKFxuICAgICAgICAgICAgL0FyZ3VtZW50ICdjXFxbMFxcXScgcGFzc2VkIHRvICdtdWx0aVJOTkNlbGwnIG11c3QgYmUgYSBUZW5zb3IvKTtcbiAgfSk7XG5cbiAgaXQoJ2lucHV0OiBoJywgKCkgPT4ge1xuICAgIGNvbnN0IGxzdG1LZXJuZWwxOiB0Zi5UZW5zb3IyRCA9IHRmLnplcm9zKFszLCA0XSk7XG4gICAgY29uc3QgbHN0bUJpYXMxOiB0Zi5UZW5zb3IxRCA9IHRmLnplcm9zKFs0XSk7XG4gICAgY29uc3QgbHN0bUtlcm5lbDI6IHRmLlRlbnNvcjJEID0gdGYuemVyb3MoWzIsIDRdKTtcbiAgICBjb25zdCBsc3RtQmlhczI6IHRmLlRlbnNvcjFEID0gdGYuemVyb3MoWzRdKTtcblxuICAgIGNvbnN0IGZvcmdldEJpYXMgPSB0Zi5zY2FsYXIoMS4wKTtcbiAgICBjb25zdCBsc3RtMSA9IChkYXRhOiBUZW5zb3IyRCwgYzogVGVuc29yMkQsIGg6IFRlbnNvcjJEKSA9PlxuICAgICAgICB0Zi5iYXNpY0xTVE1DZWxsKGZvcmdldEJpYXMsIGxzdG1LZXJuZWwxLCBsc3RtQmlhczEsIGRhdGEsIGMsIGgpO1xuICAgIGNvbnN0IGxzdG0yID0gKGRhdGE6IFRlbnNvcjJELCBjOiBUZW5zb3IyRCwgaDogVGVuc29yMkQpID0+XG4gICAgICAgIHRmLmJhc2ljTFNUTUNlbGwoZm9yZ2V0QmlhcywgbHN0bUtlcm5lbDIsIGxzdG1CaWFzMiwgZGF0YSwgYywgaCk7XG4gICAgY29uc3QgYyA9IFtcbiAgICAgIHRmLnplcm9zPFJhbmsuUjI+KFsxLCBsc3RtQmlhczEuc2hhcGVbMF0gLyA0XSksXG4gICAgICB0Zi56ZXJvczxSYW5rLlIyPihbMSwgbHN0bUJpYXMyLnNoYXBlWzBdIC8gNF0pXG4gICAgXTtcbiAgICBjb25zdCBkYXRhOiB0Zi5UZW5zb3IyRCA9IHRmLnplcm9zKFsxLCAyXSk7XG5cbiAgICBleHBlY3QoKCkgPT4gdGYubXVsdGlSTk5DZWxsKFtsc3RtMSwgbHN0bTJdLCBkYXRhLCBjLCBbe30gYXMgdGYuVGVuc29yMkRdKSlcbiAgICAgICAgLnRvVGhyb3dFcnJvcihcbiAgICAgICAgICAgIC9Bcmd1bWVudCAnaFxcWzBcXF0nIHBhc3NlZCB0byAnbXVsdGlSTk5DZWxsJyBtdXN0IGJlIGEgVGVuc29yLyk7XG4gIH0pO1xufSk7XG4iXX0=