/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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

import {DataType, KernelConfig, TensorInfo, UnaryInputs, util} from '@ohos/tfjs-converter';

import {BackendWasm} from '../backend_wasm';

import {CppDType} from './types';

export function createUnaryKernelConfig(
    kernelName: string, outType?: DataType): KernelConfig {
  let wasmFunc: (xId: number, dtype: number, outId: number) => void;

  function setupFunc(backend: BackendWasm): void {
    wasmFunc = backend.wasm.cwrap(kernelName, null /* void */, [
      'number',  // x_id
      'number',  // dtype
      'number',  // out_id
    ]);
  }

  function kernelFunc(args: {backend: BackendWasm, inputs: UnaryInputs}):
      TensorInfo {
    const {backend, inputs: {x}} = args;
    const xId = backend.dataIdMap.get(x.dataId).id;
    const out = backend.makeOutput(x.shape, outType || x.dtype);
    const outId = backend.dataIdMap.get(out.dataId).id;

    // Short-circuit zero-sized tensors.
    if (util.sizeFromShape(out.shape) === 0) {
      return out;
    }

    wasmFunc(xId, CppDType[x.dtype], outId);
    return out;
  }

  return {kernelName, backendName: 'wasm', setupFunc, kernelFunc};
}
