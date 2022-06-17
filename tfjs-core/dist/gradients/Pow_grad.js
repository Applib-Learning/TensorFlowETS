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
import { Pow } from '../kernel_names';
import * as broadcast_util from '../ops/broadcast_util';
import { cast } from '../ops/cast';
import { greater } from '../ops/greater';
import { log } from '../ops/log';
import { mul } from '../ops/mul';
import { pow } from '../ops/pow';
import { reshape } from '../ops/reshape';
import { scalar } from '../ops/scalar';
import { sub } from '../ops/sub';
import { sum } from '../ops/sum';
import { where } from '../ops/where';
import { zerosLike } from '../ops/zeros_like';
export const powGradConfig = {
    kernelName: Pow,
    inputsToSave: ['a', 'b'],
    outputsToSave: [true],
    gradFunc: (dy, saved) => {
        const [a, b, y] = saved;
        const base = a;
        const exp = b;
        const outShape = broadcast_util.assertAndGetBroadcastShape(base.shape, exp.shape);
        const derBase = () => {
            const expFloat = cast(exp, 'float32');
            let res = mul(dy, mul(expFloat, pow(base, sub(expFloat, scalar(1)))));
            const reduceAxes = broadcast_util.getReductionAxes(base.shape, outShape);
            if (reduceAxes.length > 0) {
                res = sum(res, reduceAxes);
            }
            return reshape(res, base.shape);
        };
        const derExp = () => {
            const condition = greater(base, 0);
            const logBase = where(condition, log(base), zerosLike(base));
            let res = mul(dy, mul(y, logBase));
            const reduceAxes = broadcast_util.getReductionAxes(exp.shape, outShape);
            if (reduceAxes.length > 0) {
                res = sum(res, reduceAxes);
            }
            return reshape(res, exp.shape);
        };
        return { a: derBase, b: derExp };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG93X2dyYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvcmUvc3JjL2dyYWRpZW50cy9Qb3dfZ3JhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFcEMsT0FBTyxLQUFLLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUMvQixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHNUMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFlO0lBQ3ZDLFVBQVUsRUFBRSxHQUFHO0lBQ2YsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QixhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDckIsUUFBUSxFQUFFLENBQUMsRUFBVSxFQUFFLEtBQWUsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDZCxNQUFNLFFBQVEsR0FDVixjQUFjLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckUsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ25CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6RSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM1QjtZQUNELE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ2xCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDNUI7WUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQztRQUNGLE9BQU8sRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cbmltcG9ydCB7UG93fSBmcm9tICcuLi9rZXJuZWxfbmFtZXMnO1xuaW1wb3J0IHtHcmFkQ29uZmlnfSBmcm9tICcuLi9rZXJuZWxfcmVnaXN0cnknO1xuaW1wb3J0ICogYXMgYnJvYWRjYXN0X3V0aWwgZnJvbSAnLi4vb3BzL2Jyb2FkY2FzdF91dGlsJztcbmltcG9ydCB7Y2FzdH0gZnJvbSAnLi4vb3BzL2Nhc3QnO1xuaW1wb3J0IHtncmVhdGVyfSBmcm9tICcuLi9vcHMvZ3JlYXRlcic7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vb3BzL2xvZyc7XG5pbXBvcnQge211bH0gZnJvbSAnLi4vb3BzL211bCc7XG5pbXBvcnQge3Bvd30gZnJvbSAnLi4vb3BzL3Bvdyc7XG5pbXBvcnQge3Jlc2hhcGV9IGZyb20gJy4uL29wcy9yZXNoYXBlJztcbmltcG9ydCB7c2NhbGFyfSBmcm9tICcuLi9vcHMvc2NhbGFyJztcbmltcG9ydCB7c3VifSBmcm9tICcuLi9vcHMvc3ViJztcbmltcG9ydCB7c3VtfSBmcm9tICcuLi9vcHMvc3VtJztcbmltcG9ydCB7d2hlcmV9IGZyb20gJy4uL29wcy93aGVyZSc7XG5pbXBvcnQge3plcm9zTGlrZX0gZnJvbSAnLi4vb3BzL3plcm9zX2xpa2UnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4uL3RlbnNvcic7XG5cbmV4cG9ydCBjb25zdCBwb3dHcmFkQ29uZmlnOiBHcmFkQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBQb3csXG4gIGlucHV0c1RvU2F2ZTogWydhJywgJ2InXSxcbiAgb3V0cHV0c1RvU2F2ZTogW3RydWVdLFxuICBncmFkRnVuYzogKGR5OiBUZW5zb3IsIHNhdmVkOiBUZW5zb3JbXSkgPT4ge1xuICAgIGNvbnN0IFthLCBiLCB5XSA9IHNhdmVkO1xuICAgIGNvbnN0IGJhc2UgPSBhO1xuICAgIGNvbnN0IGV4cCA9IGI7XG4gICAgY29uc3Qgb3V0U2hhcGUgPVxuICAgICAgICBicm9hZGNhc3RfdXRpbC5hc3NlcnRBbmRHZXRCcm9hZGNhc3RTaGFwZShiYXNlLnNoYXBlLCBleHAuc2hhcGUpO1xuXG4gICAgY29uc3QgZGVyQmFzZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cEZsb2F0ID0gY2FzdChleHAsICdmbG9hdDMyJyk7XG4gICAgICBsZXQgcmVzID0gbXVsKGR5LCBtdWwoZXhwRmxvYXQsIHBvdyhiYXNlLCBzdWIoZXhwRmxvYXQsIHNjYWxhcigxKSkpKSk7XG4gICAgICBjb25zdCByZWR1Y2VBeGVzID0gYnJvYWRjYXN0X3V0aWwuZ2V0UmVkdWN0aW9uQXhlcyhiYXNlLnNoYXBlLCBvdXRTaGFwZSk7XG4gICAgICBpZiAocmVkdWNlQXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcyA9IHN1bShyZXMsIHJlZHVjZUF4ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc2hhcGUocmVzLCBiYXNlLnNoYXBlKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlckV4cCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGdyZWF0ZXIoYmFzZSwgMCk7XG4gICAgICBjb25zdCBsb2dCYXNlID0gd2hlcmUoY29uZGl0aW9uLCBsb2coYmFzZSksIHplcm9zTGlrZShiYXNlKSk7XG4gICAgICBsZXQgcmVzID0gbXVsKGR5LCBtdWwoeSwgbG9nQmFzZSkpO1xuICAgICAgY29uc3QgcmVkdWNlQXhlcyA9IGJyb2FkY2FzdF91dGlsLmdldFJlZHVjdGlvbkF4ZXMoZXhwLnNoYXBlLCBvdXRTaGFwZSk7XG4gICAgICBpZiAocmVkdWNlQXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcyA9IHN1bShyZXMsIHJlZHVjZUF4ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc2hhcGUocmVzLCBleHAuc2hhcGUpO1xuICAgIH07XG4gICAgcmV0dXJuIHthOiBkZXJCYXNlLCBiOiBkZXJFeHB9O1xuICB9XG59O1xuIl19