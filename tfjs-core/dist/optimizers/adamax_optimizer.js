/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
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
import { ENGINE } from '../engine';
import { dispose, tidy } from '../globals';
import { abs } from '../ops/abs';
import { add } from '../ops/add';
import { div } from '../ops/div';
import { maximum } from '../ops/maximum';
import { mul } from '../ops/mul';
import { scalar } from '../ops/scalar';
import { sub } from '../ops/sub';
import { zerosLike } from '../ops/zeros_like';
import { registerClass } from '../serialization';
import { Optimizer } from './optimizer';
export class AdamaxOptimizer extends Optimizer {
    constructor(learningRate, beta1, beta2, epsilon = null, decay = 0.0) {
        super();
        this.learningRate = learningRate;
        this.beta1 = beta1;
        this.beta2 = beta2;
        this.epsilon = epsilon;
        this.decay = decay;
        this.accumulatedFirstMoment = [];
        this.accumulatedWeightedInfNorm = [];
        tidy(() => {
            this.iteration = scalar(0).variable();
            this.accBeta1 = scalar(beta1).variable();
        });
        if (epsilon == null) {
            this.epsilon = ENGINE.backend.epsilon();
        }
    }
    applyGradients(variableGradients) {
        const variableNames = Array.isArray(variableGradients) ?
            variableGradients.map(item => item.name) :
            Object.keys(variableGradients);
        tidy(() => {
            const oneMinusAccBeta1 = sub(1, this.accBeta1);
            const lr = div(-this.learningRate, add(mul(this.iteration, this.decay), 1));
            variableNames.forEach((name, i) => {
                const value = ENGINE.registeredVariables[name];
                const trainable = false;
                if (this.accumulatedFirstMoment[i] == null) {
                    this.accumulatedFirstMoment[i] = {
                        originalName: `${name}/m`,
                        variable: zerosLike(value).variable(trainable)
                    };
                }
                if (this.accumulatedWeightedInfNorm[i] == null) {
                    this.accumulatedWeightedInfNorm[i] = {
                        originalName: `${name}/v`,
                        variable: zerosLike(value).variable(trainable)
                    };
                }
                const gradient = Array.isArray(variableGradients) ?
                    variableGradients[i].tensor :
                    variableGradients[name];
                if (gradient == null) {
                    return;
                }
                const firstMoment = this.accumulatedFirstMoment[i].variable;
                const weightedInfNorm = this.accumulatedWeightedInfNorm[i].variable;
                const newFirstMoment = add(mul(firstMoment, this.beta1), mul(gradient, 1 - this.beta1));
                const ut0 = mul(weightedInfNorm, this.beta2);
                const ut1 = abs(gradient);
                const newWeightedInfNorm = maximum(ut0, ut1);
                firstMoment.assign(newFirstMoment);
                weightedInfNorm.assign(newWeightedInfNorm);
                const newValue = add(mul(div(lr, oneMinusAccBeta1), div(newFirstMoment, add(newWeightedInfNorm, this.epsilon))), value);
                value.assign(newValue);
            });
            this.iteration.assign(add(this.iteration, 1));
            this.accBeta1.assign(mul(this.accBeta1, this.beta1));
        });
        this.incrementIterations();
    }
    dispose() {
        this.accBeta1.dispose();
        this.iteration.dispose();
        if (this.accumulatedFirstMoment != null) {
            dispose(this.accumulatedFirstMoment.map(v => v.variable));
        }
        if (this.accumulatedWeightedInfNorm != null) {
            dispose(this.accumulatedWeightedInfNorm.map(v => v.variable));
        }
    }
    async getWeights() {
        throw new Error('getWeights() is not implemented for Adamax yet.');
    }
    async setWeights(weightValues) {
        throw new Error('setWeights() is not implemented for Adamax yet.');
    }
    getConfig() {
        return {
            'learningRate': this.learningRate,
            'beta1': this.beta1,
            'beta2': this.beta2,
            'epsilon': this.epsilon,
            'decay': this.decay
        };
    }
    /** @nocollapse */
    static fromConfig(cls, config) {
        return new cls(config['learningRate'], config['beta1'], config['beta2'], config['epsilon'], config['decay']);
    }
}
/** @nocollapse */
AdamaxOptimizer.className = 'Adamax'; // Note: Name matters for Python compatbility.
registerClass(AdamaxOptimizer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhbWF4X29wdGltaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29yZS9zcmMvb3B0aW1pemVycy9hZGFtYXhfb3B0aW1pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTtBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUMvQixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQWEsYUFBYSxFQUF3QyxNQUFNLGtCQUFrQixDQUFDO0FBSWxHLE9BQU8sRUFBQyxTQUFTLEVBQW9CLE1BQU0sYUFBYSxDQUFDO0FBRXpELE1BQU0sT0FBTyxlQUFnQixTQUFRLFNBQVM7SUFTNUMsWUFDYyxZQUFvQixFQUFZLEtBQWEsRUFDN0MsS0FBYSxFQUFZLFVBQWtCLElBQUksRUFDL0MsUUFBUSxHQUFHO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBSEksaUJBQVksR0FBWixZQUFZLENBQVE7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzdDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQy9DLFVBQUssR0FBTCxLQUFLLENBQU07UUFOakIsMkJBQXNCLEdBQXdCLEVBQUUsQ0FBQztRQUNqRCwrQkFBMEIsR0FBd0IsRUFBRSxDQUFDO1FBUTNELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLGlCQUFpRDtRQUM5RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNwRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsTUFBTSxFQUFFLEdBQ0osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDMUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxHQUFHO3dCQUMvQixZQUFZLEVBQUUsR0FBRyxJQUFJLElBQUk7d0JBQ3pCLFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDL0MsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7b0JBQzlDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsR0FBRzt3QkFDbkMsWUFBWSxFQUFFLEdBQUcsSUFBSSxJQUFJO3dCQUN6QixRQUFRLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7cUJBQy9DLENBQUM7aUJBQ0g7Z0JBRUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNwQixPQUFPO2lCQUNSO2dCQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQzVELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBRXBFLE1BQU0sY0FBYyxHQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTFCLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFN0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbkMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUUzQyxNQUFNLFFBQVEsR0FDVixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsRUFDekIsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDL0QsS0FBSyxDQUFDLENBQUM7Z0JBRWYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLEVBQUU7WUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksSUFBSSxDQUFDLDBCQUEwQixJQUFJLElBQUksRUFBRTtZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQTJCO1FBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU87WUFDTCxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCO0lBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBK0IsRUFBRSxNQUFrQjtRQUNyRCxPQUFPLElBQUksR0FBRyxDQUNWLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7QUF6SEQsa0JBQWtCO0FBQ1gseUJBQVMsR0FBRyxRQUFRLENBQUMsQ0FBRSw4Q0FBOEM7QUEwSDlFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIu+7vy8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtFTkdJTkV9IGZyb20gJy4uL2VuZ2luZSc7XG5pbXBvcnQge2Rpc3Bvc2UsIHRpZHl9IGZyb20gJy4uL2dsb2JhbHMnO1xuaW1wb3J0IHthYnN9IGZyb20gJy4uL29wcy9hYnMnO1xuaW1wb3J0IHthZGR9IGZyb20gJy4uL29wcy9hZGQnO1xuaW1wb3J0IHtkaXZ9IGZyb20gJy4uL29wcy9kaXYnO1xuaW1wb3J0IHttYXhpbXVtfSBmcm9tICcuLi9vcHMvbWF4aW11bSc7XG5pbXBvcnQge211bH0gZnJvbSAnLi4vb3BzL211bCc7XG5pbXBvcnQge3NjYWxhcn0gZnJvbSAnLi4vb3BzL3NjYWxhcic7XG5pbXBvcnQge3N1Yn0gZnJvbSAnLi4vb3BzL3N1Yic7XG5pbXBvcnQge3plcm9zTGlrZX0gZnJvbSAnLi4vb3BzL3plcm9zX2xpa2UnO1xuaW1wb3J0IHtDb25maWdEaWN0LCByZWdpc3RlckNsYXNzLCBTZXJpYWxpemFibGUsIFNlcmlhbGl6YWJsZUNvbnN0cnVjdG9yfSBmcm9tICcuLi9zZXJpYWxpemF0aW9uJztcbmltcG9ydCB7VmFyaWFibGV9IGZyb20gJy4uL3RlbnNvcic7XG5pbXBvcnQge05hbWVkVGVuc29yLCBOYW1lZFZhcmlhYmxlTWFwfSBmcm9tICcuLi90ZW5zb3JfdHlwZXMnO1xuXG5pbXBvcnQge09wdGltaXplciwgT3B0aW1pemVyVmFyaWFibGV9IGZyb20gJy4vb3B0aW1pemVyJztcblxuZXhwb3J0IGNsYXNzIEFkYW1heE9wdGltaXplciBleHRlbmRzIE9wdGltaXplciB7XG4gIC8qKiBAbm9jb2xsYXBzZSAqL1xuICBzdGF0aWMgY2xhc3NOYW1lID0gJ0FkYW1heCc7ICAvLyBOb3RlOiBOYW1lIG1hdHRlcnMgZm9yIFB5dGhvbiBjb21wYXRiaWxpdHkuXG4gIHByaXZhdGUgYWNjQmV0YTE6IFZhcmlhYmxlO1xuICBwcml2YXRlIGl0ZXJhdGlvbjogVmFyaWFibGU7XG5cbiAgcHJpdmF0ZSBhY2N1bXVsYXRlZEZpcnN0TW9tZW50OiBPcHRpbWl6ZXJWYXJpYWJsZVtdID0gW107XG4gIHByaXZhdGUgYWNjdW11bGF0ZWRXZWlnaHRlZEluZk5vcm06IE9wdGltaXplclZhcmlhYmxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCBsZWFybmluZ1JhdGU6IG51bWJlciwgcHJvdGVjdGVkIGJldGExOiBudW1iZXIsXG4gICAgICBwcm90ZWN0ZWQgYmV0YTI6IG51bWJlciwgcHJvdGVjdGVkIGVwc2lsb246IG51bWJlciA9IG51bGwsXG4gICAgICBwcm90ZWN0ZWQgZGVjYXkgPSAwLjApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGlkeSgoKSA9PiB7XG4gICAgICB0aGlzLml0ZXJhdGlvbiA9IHNjYWxhcigwKS52YXJpYWJsZSgpO1xuICAgICAgdGhpcy5hY2NCZXRhMSA9IHNjYWxhcihiZXRhMSkudmFyaWFibGUoKTtcbiAgICB9KTtcblxuICAgIGlmIChlcHNpbG9uID09IG51bGwpIHtcbiAgICAgIHRoaXMuZXBzaWxvbiA9IEVOR0lORS5iYWNrZW5kLmVwc2lsb24oKTtcbiAgICB9XG4gIH1cblxuICBhcHBseUdyYWRpZW50cyh2YXJpYWJsZUdyYWRpZW50czogTmFtZWRWYXJpYWJsZU1hcHxOYW1lZFRlbnNvcltdKSB7XG4gICAgY29uc3QgdmFyaWFibGVOYW1lcyA9IEFycmF5LmlzQXJyYXkodmFyaWFibGVHcmFkaWVudHMpID9cbiAgICAgICAgdmFyaWFibGVHcmFkaWVudHMubWFwKGl0ZW0gPT4gaXRlbS5uYW1lKSA6XG4gICAgICAgIE9iamVjdC5rZXlzKHZhcmlhYmxlR3JhZGllbnRzKTtcblxuICAgIHRpZHkoKCkgPT4ge1xuICAgICAgY29uc3Qgb25lTWludXNBY2NCZXRhMSA9IHN1YigxLCB0aGlzLmFjY0JldGExKTtcbiAgICAgIGNvbnN0IGxyID1cbiAgICAgICAgICBkaXYoLXRoaXMubGVhcm5pbmdSYXRlLCBhZGQobXVsKHRoaXMuaXRlcmF0aW9uLCB0aGlzLmRlY2F5KSwgMSkpO1xuXG4gICAgICB2YXJpYWJsZU5hbWVzLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBFTkdJTkUucmVnaXN0ZXJlZFZhcmlhYmxlc1tuYW1lXTtcbiAgICAgICAgY29uc3QgdHJhaW5hYmxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkRmlyc3RNb21lbnRbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRGaXJzdE1vbWVudFtpXSA9IHtcbiAgICAgICAgICAgIG9yaWdpbmFsTmFtZTogYCR7bmFtZX0vbWAsXG4gICAgICAgICAgICB2YXJpYWJsZTogemVyb3NMaWtlKHZhbHVlKS52YXJpYWJsZSh0cmFpbmFibGUpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hY2N1bXVsYXRlZFdlaWdodGVkSW5mTm9ybVtpXSA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZFdlaWdodGVkSW5mTm9ybVtpXSA9IHtcbiAgICAgICAgICAgIG9yaWdpbmFsTmFtZTogYCR7bmFtZX0vdmAsXG4gICAgICAgICAgICB2YXJpYWJsZTogemVyb3NMaWtlKHZhbHVlKS52YXJpYWJsZSh0cmFpbmFibGUpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyYWRpZW50ID0gQXJyYXkuaXNBcnJheSh2YXJpYWJsZUdyYWRpZW50cykgP1xuICAgICAgICAgICAgdmFyaWFibGVHcmFkaWVudHNbaV0udGVuc29yIDpcbiAgICAgICAgICAgIHZhcmlhYmxlR3JhZGllbnRzW25hbWVdO1xuICAgICAgICBpZiAoZ3JhZGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpcnN0TW9tZW50ID0gdGhpcy5hY2N1bXVsYXRlZEZpcnN0TW9tZW50W2ldLnZhcmlhYmxlO1xuICAgICAgICBjb25zdCB3ZWlnaHRlZEluZk5vcm0gPSB0aGlzLmFjY3VtdWxhdGVkV2VpZ2h0ZWRJbmZOb3JtW2ldLnZhcmlhYmxlO1xuXG4gICAgICAgIGNvbnN0IG5ld0ZpcnN0TW9tZW50ID1cbiAgICAgICAgICAgIGFkZChtdWwoZmlyc3RNb21lbnQsIHRoaXMuYmV0YTEpLCBtdWwoZ3JhZGllbnQsIDEgLSB0aGlzLmJldGExKSk7XG5cbiAgICAgICAgY29uc3QgdXQwID0gbXVsKHdlaWdodGVkSW5mTm9ybSwgdGhpcy5iZXRhMik7XG4gICAgICAgIGNvbnN0IHV0MSA9IGFicyhncmFkaWVudCk7XG5cbiAgICAgICAgY29uc3QgbmV3V2VpZ2h0ZWRJbmZOb3JtID0gbWF4aW11bSh1dDAsIHV0MSk7XG5cbiAgICAgICAgZmlyc3RNb21lbnQuYXNzaWduKG5ld0ZpcnN0TW9tZW50KTtcbiAgICAgICAgd2VpZ2h0ZWRJbmZOb3JtLmFzc2lnbihuZXdXZWlnaHRlZEluZk5vcm0pO1xuXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID1cbiAgICAgICAgICAgIGFkZChtdWwoZGl2KGxyLCBvbmVNaW51c0FjY0JldGExKSxcbiAgICAgICAgICAgICAgICAgICAgZGl2KG5ld0ZpcnN0TW9tZW50LCBhZGQobmV3V2VpZ2h0ZWRJbmZOb3JtLCB0aGlzLmVwc2lsb24pKSksXG4gICAgICAgICAgICAgICAgdmFsdWUpO1xuXG4gICAgICAgIHZhbHVlLmFzc2lnbihuZXdWYWx1ZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pdGVyYXRpb24uYXNzaWduKGFkZCh0aGlzLml0ZXJhdGlvbiwgMSkpO1xuICAgICAgdGhpcy5hY2NCZXRhMS5hc3NpZ24obXVsKHRoaXMuYWNjQmV0YTEsIHRoaXMuYmV0YTEpKTtcbiAgICB9KTtcbiAgICB0aGlzLmluY3JlbWVudEl0ZXJhdGlvbnMoKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5hY2NCZXRhMS5kaXNwb3NlKCk7XG4gICAgdGhpcy5pdGVyYXRpb24uZGlzcG9zZSgpO1xuXG4gICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRGaXJzdE1vbWVudCAhPSBudWxsKSB7XG4gICAgICBkaXNwb3NlKHRoaXMuYWNjdW11bGF0ZWRGaXJzdE1vbWVudC5tYXAodiA9PiB2LnZhcmlhYmxlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkV2VpZ2h0ZWRJbmZOb3JtICE9IG51bGwpIHtcbiAgICAgIGRpc3Bvc2UodGhpcy5hY2N1bXVsYXRlZFdlaWdodGVkSW5mTm9ybS5tYXAodiA9PiB2LnZhcmlhYmxlKSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0V2VpZ2h0cygpOiBQcm9taXNlPE5hbWVkVGVuc29yW10+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFdlaWdodHMoKSBpcyBub3QgaW1wbGVtZW50ZWQgZm9yIEFkYW1heCB5ZXQuJyk7XG4gIH1cblxuICBhc3luYyBzZXRXZWlnaHRzKHdlaWdodFZhbHVlczogTmFtZWRUZW5zb3JbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0V2VpZ2h0cygpIGlzIG5vdCBpbXBsZW1lbnRlZCBmb3IgQWRhbWF4IHlldC4nKTtcbiAgfVxuXG4gIGdldENvbmZpZygpOiBDb25maWdEaWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xlYXJuaW5nUmF0ZSc6IHRoaXMubGVhcm5pbmdSYXRlLFxuICAgICAgJ2JldGExJzogdGhpcy5iZXRhMSxcbiAgICAgICdiZXRhMic6IHRoaXMuYmV0YTIsXG4gICAgICAnZXBzaWxvbic6IHRoaXMuZXBzaWxvbixcbiAgICAgICdkZWNheSc6IHRoaXMuZGVjYXlcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBmcm9tQ29uZmlnPFQgZXh0ZW5kcyBTZXJpYWxpemFibGU+KFxuICAgICAgY2xzOiBTZXJpYWxpemFibGVDb25zdHJ1Y3RvcjxUPiwgY29uZmlnOiBDb25maWdEaWN0KTogVCB7XG4gICAgcmV0dXJuIG5ldyBjbHMoXG4gICAgICAgIGNvbmZpZ1snbGVhcm5pbmdSYXRlJ10sIGNvbmZpZ1snYmV0YTEnXSwgY29uZmlnWydiZXRhMiddLFxuICAgICAgICBjb25maWdbJ2Vwc2lsb24nXSwgY29uZmlnWydkZWNheSddKTtcbiAgfVxufVxucmVnaXN0ZXJDbGFzcyhBZGFtYXhPcHRpbWl6ZXIpO1xuIl19