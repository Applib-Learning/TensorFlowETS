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
// Importing local_storage and indexed_db is necessary for the routers to be
// registered.
import './indexed_db';
import './local_storage';
import { browserFiles } from './browser_files';
import { browserHTTPRequest, http, isHTTPScheme } from './http';
import { concatenateArrayBuffers, decodeWeights, encodeWeights, getModelArtifactsForJSON, getModelArtifactsInfoForJSON } from './io_utils';
import { fromMemory, fromMemorySync, withSaveHandler, withSaveHandlerSync } from './passthrough';
import { getLoadHandlers, getSaveHandlers, registerLoadRouter, registerSaveRouter } from './router_registry';
import { loadWeights, weightsLoaderFactory } from './weights_loader';
export { copyModel, listModels, moveModel, removeModel } from './model_management';
export { browserFiles, browserHTTPRequest, concatenateArrayBuffers, decodeWeights, encodeWeights, fromMemory, fromMemorySync, getLoadHandlers, getModelArtifactsForJSON, getModelArtifactsInfoForJSON, getSaveHandlers, http, isHTTPScheme, loadWeights, registerLoadRouter, registerSaveRouter, weightsLoaderFactory, withSaveHandler, withSaveHandlerSync, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvcmUvc3JjL2lvL2lvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILDRFQUE0RTtBQUM1RSxjQUFjO0FBQ2QsT0FBTyxjQUFjLENBQUM7QUFDdEIsT0FBTyxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDOUQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsd0JBQXdCLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDekksT0FBTyxFQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFM0csT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRW5FLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRixPQUFPLEVBQ0wsWUFBWSxFQUNaLGtCQUFrQixFQUNsQix1QkFBdUIsRUFDdkIsYUFBYSxFQUNiLGFBQWEsRUFDYixVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsRUFDZix3QkFBd0IsRUFDeEIsNEJBQTRCLEVBQzVCLGVBQWUsRUFDZixJQUFJLEVBR0osWUFBWSxFQUdaLFdBQVcsRUFNWCxrQkFBa0IsRUFDbEIsa0JBQWtCLEVBT2xCLG9CQUFvQixFQUdwQixlQUFlLEVBQ2YsbUJBQW1CLEdBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8vIEltcG9ydGluZyBsb2NhbF9zdG9yYWdlIGFuZCBpbmRleGVkX2RiIGlzIG5lY2Vzc2FyeSBmb3IgdGhlIHJvdXRlcnMgdG8gYmVcbi8vIHJlZ2lzdGVyZWQuXG5pbXBvcnQgJy4vaW5kZXhlZF9kYic7XG5pbXBvcnQgJy4vbG9jYWxfc3RvcmFnZSc7XG5cbmltcG9ydCB7YnJvd3NlckZpbGVzfSBmcm9tICcuL2Jyb3dzZXJfZmlsZXMnO1xuaW1wb3J0IHticm93c2VySFRUUFJlcXVlc3QsIGh0dHAsIGlzSFRUUFNjaGVtZX0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7Y29uY2F0ZW5hdGVBcnJheUJ1ZmZlcnMsIGRlY29kZVdlaWdodHMsIGVuY29kZVdlaWdodHMsIGdldE1vZGVsQXJ0aWZhY3RzRm9ySlNPTiwgZ2V0TW9kZWxBcnRpZmFjdHNJbmZvRm9ySlNPTn0gZnJvbSAnLi9pb191dGlscyc7XG5pbXBvcnQge2Zyb21NZW1vcnksIGZyb21NZW1vcnlTeW5jLCB3aXRoU2F2ZUhhbmRsZXIsIHdpdGhTYXZlSGFuZGxlclN5bmN9IGZyb20gJy4vcGFzc3Rocm91Z2gnO1xuaW1wb3J0IHtnZXRMb2FkSGFuZGxlcnMsIGdldFNhdmVIYW5kbGVycywgcmVnaXN0ZXJMb2FkUm91dGVyLCByZWdpc3RlclNhdmVSb3V0ZXJ9IGZyb20gJy4vcm91dGVyX3JlZ2lzdHJ5JztcbmltcG9ydCB7SU9IYW5kbGVyLCBJT0hhbmRsZXJTeW5jLCBMb2FkSGFuZGxlciwgTG9hZE9wdGlvbnMsIE1vZGVsQXJ0aWZhY3RzLCBNb2RlbEFydGlmYWN0c0luZm8sIE1vZGVsSlNPTiwgTW9kZWxTdG9yZU1hbmFnZXIsIE9uUHJvZ3Jlc3NDYWxsYmFjaywgUmVxdWVzdERldGFpbHMsIFNhdmVDb25maWcsIFNhdmVIYW5kbGVyLCBTYXZlUmVzdWx0LCBUcmFpbmluZ0NvbmZpZywgV2VpZ2h0R3JvdXAsIFdlaWdodHNNYW5pZmVzdENvbmZpZywgV2VpZ2h0c01hbmlmZXN0RW50cnl9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtsb2FkV2VpZ2h0cywgd2VpZ2h0c0xvYWRlckZhY3Rvcnl9IGZyb20gJy4vd2VpZ2h0c19sb2FkZXInO1xuXG5leHBvcnQge2NvcHlNb2RlbCwgbGlzdE1vZGVscywgbW92ZU1vZGVsLCByZW1vdmVNb2RlbH0gZnJvbSAnLi9tb2RlbF9tYW5hZ2VtZW50JztcbmV4cG9ydCB7XG4gIGJyb3dzZXJGaWxlcyxcbiAgYnJvd3NlckhUVFBSZXF1ZXN0LFxuICBjb25jYXRlbmF0ZUFycmF5QnVmZmVycyxcbiAgZGVjb2RlV2VpZ2h0cyxcbiAgZW5jb2RlV2VpZ2h0cyxcbiAgZnJvbU1lbW9yeSxcbiAgZnJvbU1lbW9yeVN5bmMsXG4gIGdldExvYWRIYW5kbGVycyxcbiAgZ2V0TW9kZWxBcnRpZmFjdHNGb3JKU09OLFxuICBnZXRNb2RlbEFydGlmYWN0c0luZm9Gb3JKU09OLFxuICBnZXRTYXZlSGFuZGxlcnMsXG4gIGh0dHAsXG4gIElPSGFuZGxlcixcbiAgSU9IYW5kbGVyU3luYyxcbiAgaXNIVFRQU2NoZW1lLFxuICBMb2FkSGFuZGxlcixcbiAgTG9hZE9wdGlvbnMsXG4gIGxvYWRXZWlnaHRzLFxuICBNb2RlbEFydGlmYWN0cyxcbiAgTW9kZWxBcnRpZmFjdHNJbmZvLFxuICBNb2RlbEpTT04sXG4gIE1vZGVsU3RvcmVNYW5hZ2VyLFxuICBPblByb2dyZXNzQ2FsbGJhY2ssXG4gIHJlZ2lzdGVyTG9hZFJvdXRlcixcbiAgcmVnaXN0ZXJTYXZlUm91dGVyLFxuICBSZXF1ZXN0RGV0YWlscyxcbiAgU2F2ZUNvbmZpZyxcbiAgU2F2ZUhhbmRsZXIsXG4gIFNhdmVSZXN1bHQsXG4gIFRyYWluaW5nQ29uZmlnLFxuICBXZWlnaHRHcm91cCxcbiAgd2VpZ2h0c0xvYWRlckZhY3RvcnksXG4gIFdlaWdodHNNYW5pZmVzdENvbmZpZyxcbiAgV2VpZ2h0c01hbmlmZXN0RW50cnksXG4gIHdpdGhTYXZlSGFuZGxlcixcbiAgd2l0aFNhdmVIYW5kbGVyU3luYyxcbn07XG4iXX0=