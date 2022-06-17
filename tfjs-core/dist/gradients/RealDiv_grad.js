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
import { RealDiv } from '../kernel_names';
import * as broadcast_util from '../ops/broadcast_util';
import { cast } from '../ops/cast';
import { div } from '../ops/div';
import { mul } from '../ops/mul';
import { neg } from '../ops/neg';
import { reshape } from '../ops/reshape';
import { square } from '../ops/square';
import { sum } from '../ops/sum';
export const divGradConfig = {
    kernelName: RealDiv,
    inputsToSave: ['a', 'b'],
    gradFunc: (dy, saved) => {
        const [a, b] = saved;
        const outShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        const derA = () => {
            const res = div(dy, cast(b, 'float32'));
            const reduceAxes = broadcast_util.getReductionAxes(a.shape, outShape);
            if (reduceAxes.length > 0) {
                return reshape(sum(res, reduceAxes), a.shape);
            }
            return res;
        };
        const derB = () => {
            let res = mul(dy, cast(a, 'float32'));
            const reduceAxes = broadcast_util.getReductionAxes(b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = reshape(sum(res, reduceAxes), b.shape);
            }
            const tmp = square(b);
            return neg(div(res, cast(tmp, 'float32')));
        };
        return { a: derA, b: derB };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhbERpdl9ncmFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1jb3JlL3NyYy9ncmFkaWVudHMvUmVhbERpdl9ncmFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLEtBQUssY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUMvQixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUcvQixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWU7SUFDdkMsVUFBVSxFQUFFLE9BQU87SUFDbkIsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QixRQUFRLEVBQUUsQ0FBQyxFQUFVLEVBQUUsS0FBZSxFQUFFLEVBQUU7UUFDeEMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxRQUFRLEdBQ1YsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUNoQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0RSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3RFLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUM7UUFDRixPQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7UmVhbERpdn0gZnJvbSAnLi4va2VybmVsX25hbWVzJztcbmltcG9ydCB7R3JhZENvbmZpZ30gZnJvbSAnLi4va2VybmVsX3JlZ2lzdHJ5JztcbmltcG9ydCAqIGFzIGJyb2FkY2FzdF91dGlsIGZyb20gJy4uL29wcy9icm9hZGNhc3RfdXRpbCc7XG5pbXBvcnQge2Nhc3R9IGZyb20gJy4uL29wcy9jYXN0JztcbmltcG9ydCB7ZGl2fSBmcm9tICcuLi9vcHMvZGl2JztcbmltcG9ydCB7bXVsfSBmcm9tICcuLi9vcHMvbXVsJztcbmltcG9ydCB7bmVnfSBmcm9tICcuLi9vcHMvbmVnJztcbmltcG9ydCB7cmVzaGFwZX0gZnJvbSAnLi4vb3BzL3Jlc2hhcGUnO1xuaW1wb3J0IHtzcXVhcmV9IGZyb20gJy4uL29wcy9zcXVhcmUnO1xuaW1wb3J0IHtzdW19IGZyb20gJy4uL29wcy9zdW0nO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4uL3RlbnNvcic7XG5cbmV4cG9ydCBjb25zdCBkaXZHcmFkQ29uZmlnOiBHcmFkQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBSZWFsRGl2LFxuICBpbnB1dHNUb1NhdmU6IFsnYScsICdiJ10sXG4gIGdyYWRGdW5jOiAoZHk6IFRlbnNvciwgc2F2ZWQ6IFRlbnNvcltdKSA9PiB7XG4gICAgY29uc3QgW2EsIGJdID0gc2F2ZWQ7XG4gICAgY29uc3Qgb3V0U2hhcGUgPVxuICAgICAgICBicm9hZGNhc3RfdXRpbC5hc3NlcnRBbmRHZXRCcm9hZGNhc3RTaGFwZShhLnNoYXBlLCBiLnNoYXBlKTtcbiAgICBjb25zdCBkZXJBID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gZGl2KGR5LCBjYXN0KGIsICdmbG9hdDMyJykpO1xuICAgICAgY29uc3QgcmVkdWNlQXhlcyA9IGJyb2FkY2FzdF91dGlsLmdldFJlZHVjdGlvbkF4ZXMoYS5zaGFwZSwgb3V0U2hhcGUpO1xuICAgICAgaWYgKHJlZHVjZUF4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gcmVzaGFwZShzdW0ocmVzLCByZWR1Y2VBeGVzKSwgYS5zaGFwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgY29uc3QgZGVyQiA9ICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBtdWwoZHksIGNhc3QoYSwgJ2Zsb2F0MzInKSk7XG4gICAgICBjb25zdCByZWR1Y2VBeGVzID0gYnJvYWRjYXN0X3V0aWwuZ2V0UmVkdWN0aW9uQXhlcyhiLnNoYXBlLCBvdXRTaGFwZSk7XG4gICAgICBpZiAocmVkdWNlQXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcyA9IHJlc2hhcGUoc3VtKHJlcywgcmVkdWNlQXhlcyksIGIuc2hhcGUpO1xuICAgICAgfVxuICAgICAgY29uc3QgdG1wID0gc3F1YXJlKGIpO1xuICAgICAgcmV0dXJuIG5lZyhkaXYocmVzLCBjYXN0KHRtcCwgJ2Zsb2F0MzInKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIHthOiBkZXJBLCBiOiBkZXJCfTtcbiAgfVxufTtcbiJdfQ==