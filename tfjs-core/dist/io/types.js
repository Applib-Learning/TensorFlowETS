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
/* Type definitions for exporting and importing of models. */
/**
 * A map from Tensor dtype to number of bytes per element of the Tensor.
 */
export const DTYPE_VALUE_SIZE_MAP = {
    'float32': 4,
    'float16': 2,
    'int32': 4,
    'uint16': 2,
    'uint8': 1,
    'bool': 1,
    'complex64': 8
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvcmUvc3JjL2lvL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILDZEQUE2RDtBQUU3RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUE4QjtJQUM3RCxTQUFTLEVBQUUsQ0FBQztJQUNaLFNBQVMsRUFBRSxDQUFDO0lBQ1osT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsQ0FBQztJQUNYLE9BQU8sRUFBRSxDQUFDO0lBQ1YsTUFBTSxFQUFFLENBQUM7SUFDVCxXQUFXLEVBQUUsQ0FBQztDQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qIFR5cGUgZGVmaW5pdGlvbnMgZm9yIGV4cG9ydGluZyBhbmQgaW1wb3J0aW5nIG9mIG1vZGVscy4gKi9cblxuLyoqXG4gKiBBIG1hcCBmcm9tIFRlbnNvciBkdHlwZSB0byBudW1iZXIgb2YgYnl0ZXMgcGVyIGVsZW1lbnQgb2YgdGhlIFRlbnNvci5cbiAqL1xuZXhwb3J0IGNvbnN0IERUWVBFX1ZBTFVFX1NJWkVfTUFQOiB7W2R0eXBlOiBzdHJpbmddOiBudW1iZXJ9ID0ge1xuICAnZmxvYXQzMic6IDQsXG4gICdmbG9hdDE2JzogMixcbiAgJ2ludDMyJzogNCxcbiAgJ3VpbnQxNic6IDIsXG4gICd1aW50OCc6IDEsXG4gICdib29sJzogMSxcbiAgJ2NvbXBsZXg2NCc6IDhcbn07XG5cbi8qKlxuICogQSB3ZWlnaHQgbWFuaWZlc3QuXG4gKlxuICogVGhlIHdlaWdodCBtYW5pZmVzdCBjb25zaXN0cyBvZiBhbiBvcmRlcmVkIGxpc3Qgb2Ygd2VpZ2h0LW1hbmlmZXN0IGdyb3Vwcy5cbiAqIEVhY2ggd2VpZ2h0LW1hbmlmZXN0IGdyb3VwIChcImdyb3VwXCIgZm9yIHNob3J0IGhlcmVhZnRlcikgY29uc2lzdHMgb2YgYVxuICogbnVtYmVyIG9mIHdlaWdodCB2YWx1ZXMgc3RvcmVkIGluIGEgbnVtYmVyIG9mIHBhdGhzLlxuICogU2VlIHRoZSBkb2N1bWVudGF0aW9uIG9mIGBXZWlnaHRNYW5pZmVzdEdyb3VwQ29uZmlnYCBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG5leHBvcnQgZGVjbGFyZSB0eXBlIFdlaWdodHNNYW5pZmVzdENvbmZpZyA9IFdlaWdodHNNYW5pZmVzdEdyb3VwQ29uZmlnW107XG5cbi8qKlxuICogQSB3ZWlnaHQtbWFuaWZlc3QgZ3JvdXAuXG4gKlxuICogQ29uc2lzdHMgb2YgYW4gb3JkZXJlZCBsaXN0IG9mIHdlaWdodCB2YWx1ZXMgZW5jb2RlZCBpbiBiaW5hcnkgZm9ybWF0LFxuICogc3RvcmVkIGluIGFuIG9yZGVyZWQgbGlzdCBvZiBwYXRocy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFdlaWdodHNNYW5pZmVzdEdyb3VwQ29uZmlnIHtcbiAgLyoqXG4gICAqIEFuIG9yZGVyZWQgbGlzdCBvZiBwYXRocy5cbiAgICpcbiAgICogUGF0aHMgYXJlIGludGVudGlvbmFsbHkgYWJzdHJhY3QgaW4gb3JkZXIgdG8gYmUgZ2VuZXJhbC4gRm9yIGV4YW1wbGUsIHRoZXlcbiAgICogY2FuIGJlIHJlbGF0aXZlIFVSTCBwYXRocyBvciByZWxhdGl2ZSBwYXRocyBvbiB0aGUgZmlsZSBzeXN0ZW0uXG4gICAqL1xuICBwYXRoczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFNwZWNpZmljYXRpb25zIG9mIHRoZSB3ZWlnaHRzIHN0b3JlZCBpbiB0aGUgcGF0aHMuXG4gICAqL1xuICB3ZWlnaHRzOiBXZWlnaHRzTWFuaWZlc3RFbnRyeVtdO1xufVxuXG4vKipcbiAqIEdyb3VwIHRvIHdoaWNoIHRoZSB3ZWlnaHQgYmVsb25ncy5cbiAqXG4gKiAtICdvcHRpbWl6ZXInOiBXZWlnaHQgZnJvbSBhIHN0YXRlZnVsIG9wdGltaXplci5cbiAqL1xuZXhwb3J0IHR5cGUgV2VpZ2h0R3JvdXAgPSAnbW9kZWwnfCdvcHRpbWl6ZXInO1xuXG4vKipcbiAqIEFuIGVudHJ5IGluIHRoZSB3ZWlnaHQgbWFuaWZlc3QuXG4gKlxuICogVGhlIGVudHJ5IGNvbnRhaW5zIHNwZWNpZmljYXRpb24gb2YgYSB3ZWlnaHQuXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBXZWlnaHRzTWFuaWZlc3RFbnRyeSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSB3ZWlnaHQsIGUuZy4sICdEZW5zZV8xL2JpYXMnXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNoYXBlIG9mIHRoZSB3ZWlnaHQuXG4gICAqL1xuICBzaGFwZTogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIERhdGEgdHlwZSBvZiB0aGUgd2VpZ2h0LlxuICAgKi9cbiAgZHR5cGU6ICdmbG9hdDMyJ3wnaW50MzInfCdib29sJ3wnc3RyaW5nJ3wnY29tcGxleDY0JztcblxuICAvKipcbiAgICogVHlwZSBvZiB0aGUgd2VpZ2h0LlxuICAgKlxuICAgKiBPcHRpb25hbC5cbiAgICpcbiAgICogVGhlIHZhbHVlICdvcHRpbWl6ZXInIGluZGljYXRlcyB0aGUgd2VpZ2h0IGJlbG9uZ3MgdG8gYW4gb3B0aW1pemVyXG4gICAqIChpLmUuLCB1c2VkIG9ubHkgZHVyaW5nIG1vZGVsIHRyYWluaW5nIGFuZCBub3QgZHVyaW5nIGluZmVyZW5jZSkuXG4gICAqL1xuICBncm91cD86IFdlaWdodEdyb3VwO1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBmb3IgZGVxdWFudGl6YXRpb24gb2YgdGhlIHdlaWdodC5cbiAgICovXG4gIHF1YW50aXphdGlvbj86IHtcbiAgICBzY2FsZT86IG51bWJlciwgIC8vIFRoZSBzY2FsaW5nIGNvbnN0YW50IHRvIG11bHRpcGx5IGJ5LlxuICAgIG1pbj86IG51bWJlciwgICAgLy8gVGhlIChwb3NzaWJseSBudWRnZWQpIG1pbmltdW0gd2VpZ2h0IHRvIGFkZC5cbiAgICAgICBkdHlwZTogJ3VpbnQxNid8J3VpbnQ4J3wnZmxvYXQxNicgIC8vIFRoZSBkdHlwZSBvZiB0aGUgcXVhbnRpemVkIHdlaWdodHMuXG4gIH07XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3Igc2F2aW5nIGEgbW9kZWwuXG4gKiBAaW5uYW1lc3BhY2UgaW9cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYXZlQ29uZmlnIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc2F2ZSBvbmx5IHRoZSB0cmFpbmFibGUgd2VpZ2h0cyBvZiB0aGUgbW9kZWwsIGlnbm9yaW5nIHRoZVxuICAgKiBub24tdHJhaW5hYmxlIG9uZXMuXG4gICAqL1xuICB0cmFpbmFibGVPbmx5PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgb3B0aW1pemVyIHdpbGwgYmUgc2F2ZWQgKGlmIGV4aXN0cykuXG4gICAqXG4gICAqIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAqL1xuICBpbmNsdWRlT3B0aW1pemVyPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBSZXN1bHQgb2YgYSBzYXZpbmcgb3BlcmF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhdmVSZXN1bHQge1xuICAvKipcbiAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIG1vZGVsIGFydGlmYWN0cyBzYXZlZC5cbiAgICovXG4gIG1vZGVsQXJ0aWZhY3RzSW5mbzogTW9kZWxBcnRpZmFjdHNJbmZvO1xuXG4gIC8qKlxuICAgKiBIVFRQIHJlc3BvbnNlcyBmcm9tIHRoZSBzZXJ2ZXIgdGhhdCBoYW5kbGVkIHRoZSBtb2RlbC1zYXZpbmcgcmVxdWVzdCAoaWZcbiAgICogYW55KS4gVGhpcyBpcyBhcHBsaWNhYmxlIG9ubHkgdG8gc2VydmVyLWJhc2VkIHNhdmluZyByb3V0ZXMuXG4gICAqL1xuICByZXNwb25zZXM/OiBSZXNwb25zZVtdO1xuXG4gIC8qKlxuICAgKiBFcnJvciBtZXNzYWdlcyBhbmQgcmVsYXRlZCBkYXRhIChpZiBhbnkpLlxuICAgKi9cbiAgZXJyb3JzPzogQXJyYXk8e318c3RyaW5nPjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIE1vZGVsQXJ0aWZhY3RzSW5mbyB7XG4gIC8qKlxuICAgKiBUaW1lc3RhbXAgZm9yIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLlxuICAgKi9cbiAgZGF0ZVNhdmVkOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBUT0RPIChjYWlzLHlhc3NvZ2JhKSBjb25zaWRlciByZW1vdmluZyBHcmFwaERlZiBhcyBHcmFwaERlZnMgbm93XG4gICAqIGNvbWUgaW4gYSBKU09OIGZvcm1hdCBhbmQgbm9uZSBvZiBvdXIgSU9IYW5kbGVycyBzdXBwb3J0IGEgbm9uIGpzb25cbiAgICogZm9ybWF0LiBXZSBjb3VsZCBjb25kZXIgcmVwbGFjaW5nIHRoaXMgd2l0aCAnQmluYXJ5JyBpZiB3ZSB3YW50IHRvXG4gICAqIGFsbG93IGZ1dHVyZSBoYW5kbGVycyB0byBzYXZlIHRvIG5vbiBqc29uIGZvcm1hdHMgKHRob3VnaCB0aGV5IHdpbGxcbiAgICogcHJvYmFibHkgd2FudCBtb3JlIGluZm9ybWF0aW9uIHRoYW4gJ0JpbmFyeScpLlxuICAgKiBUeXBlIG9mIHRoZSBtb2RlbCB0b3BvbG9neVxuICAgKlxuICAgKiBUeXBlIG9mIHRoZSBtb2RlbCB0b3BvbG9neVxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXM6XG4gICAqICAgLSBKU09OOiBKU09OIGNvbmZpZyAoaHVtYW4tcmVhZGFibGUsIGUuZy4sIEtlcmFzIEpTT04pLlxuICAgKiAgIC0gR3JhcGhEZWY6IFRlbnNvckZsb3dcbiAgICogICAgIFtHcmFwaERlZl0oaHR0cHM6Ly93d3cudGVuc29yZmxvdy5vcmcvZXh0ZW5kL3Rvb2xfZGV2ZWxvcGVycy8jZ3JhcGhkZWYpXG4gICAqICAgICBwcm90b2NvbCBidWZmZXIgKGJpbmFyeSkuXG4gICAqL1xuICBtb2RlbFRvcG9sb2d5VHlwZTogJ0pTT04nfCdHcmFwaERlZic7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgbW9kZWwgdG9wb2xvZ3kgKEtlcmFzIEpTT04gb3IgR3JhcGhEZWYpLCBpbiBieXRlcy5cbiAgICovXG4gIG1vZGVsVG9wb2xvZ3lCeXRlcz86IG51bWJlcjtcblxuICAvKipcbiAgICogU2l6ZSBvZiB3ZWlnaHQgc3BlY2lmaWNhdGlvbiBvciBtYW5pZmVzdCwgaW4gYnl0ZXMuXG4gICAqL1xuICB3ZWlnaHRTcGVjc0J5dGVzPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIHdlaWdodCB2YWx1ZSBkYXRhLCBpbiBieXRlcy5cbiAgICovXG4gIHdlaWdodERhdGFCeXRlcz86IG51bWJlcjtcbn1cblxuLyoqIE1vZGVsIHRyYWluaW5nIGNvbmZpZ3VyYXRpb24uICovXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHJhaW5pbmdDb25maWcge1xuICAvLyBUT0RPKGNhaXMpOiBUaWdodGVuIHRoZSB0eXBpbmcgb25jZSBrZXJhcyBzcGVjIGlzIGF2YWlsYWJsZSB0byB0ZmpzLWNvcmUuXG4gIC8vIFNlZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90ZW5zb3JmbG93L3RmanMtbGF5ZXJzL2Jsb2IvbWFzdGVyL3NyYy9rZXJhc19mb3JtYXQvdHJhaW5pbmdfY29uZmlnLnRzXG4gIC8qKiBPcHRpbWl6ZXIgdXNlZCBmb3IgdGhlIG1vZGVsIHRyYWluaW5nLiAqL1xuICBvcHRpbWl6ZXJfY29uZmlnOiB7fTtcblxuICAvLyBUT0RPKGNhaXMpOiBUaWdodGVuIHRoZSB0eXBpbmcgb25jZSBrZXJhcyBzcGVjIGlzIGF2YWlsYWJsZSB0byB0ZmpzLWNvcmUuXG4gIC8qKiBMb3NzIGZ1bmN0aW9uKHMpIGZvciB0aGUgbW9kZWwncyBvdXRwdXQocykuICovXG4gIGxvc3M6IHN0cmluZ3xzdHJpbmdbXXx7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcblxuICAvLyBUT0RPKGNhaXMpOiBUaWdodGVuIHRoZSB0eXBpbmcgb25jZSBrZXJhcyBzcGVjIGlzIGF2YWlsYWJsZSB0byB0ZmpzLWNvcmUuXG4gIC8qKiBNZXRyaWMgZnVuY3Rpb24ocykgZm9yIHRoZSBtb2RlbCdzIG91dHB1dChzKS4gKi9cbiAgbWV0cmljcz86IHN0cmluZ1tdfHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gIC8vIFRPRE8oY2Fpcyk6IFRpZ2h0ZW4gdGhlIHR5cGluZyBvbmNlIGtlcmFzIHNwZWMgaXMgYXZhaWxhYmxlIHRvIHRmanMtY29yZS5cbiAgd2VpZ2h0ZWRfbWV0cmljcz86IHN0cmluZ1tdO1xuXG4gIC8vIFRPRE8oY2Fpcyk6IFRpZ2h0ZW4gdGhlIHR5cGluZyBvbmNlIGtlcmFzIHNwZWMgaXMgYXZhaWxhYmxlIHRvIHRmanMtY29yZS5cbiAgc2FtcGxlX3dlaWdodF9tb2RlPzogc3RyaW5nO1xuXG4gIGxvc3Nfd2VpZ2h0cz86IG51bWJlcltdfHtba2V5OiBzdHJpbmddOiBudW1iZXJ9O1xufVxuXG4vKipcbiAqIFRoZSBzZXJpYWxpemVkIGFydGlmYWN0cyBvZiBhIG1vZGVsLCBpbmNsdWRpbmcgdG9wb2xvZ3kgYW5kIHdlaWdodHMuXG4gKlxuICogVGhlIGBtb2RlbFRvcG9sb2d5YCwgYHRyYWluaW5nQ29uZmlnYCwgYHdlaWdodFNwZWNzYCBhbmQgYHdlaWdodERhdGFgIGZpZWxkc1xuICogb2YgdGhpcyBpbnRlcmZhY2UgYXJlIG9wdGlvbmFsLCBpbiBvcmRlciB0byBzdXBwb3J0IHRvcG9sb2d5LSBvciB3ZWlnaHRzLW9ubHlcbiAqIHNhdmluZyBhbmQgbG9hZGluZy5cbiAqXG4gKiBOb3RlIHRoaXMgaW50ZXJmYWNlIGlzIHVzZWQgaW50ZXJuYWxseSBpbiBJT0hhbmRsZXJzLiAgRm9yIHRoZSBmaWxlIGZvcm1hdFxuICogd3JpdHRlbiB0byBkaXNrIGFzIGBtb2RlbC5qc29uYCwgc2VlIGBNb2RlbEpTT05gLlxuICovXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTW9kZWxBcnRpZmFjdHMge1xuICAvKipcbiAgICogTW9kZWwgdG9wb2xvZ3kuXG4gICAqXG4gICAqIEZvciBLZXJhcy1zdHlsZSBgdGYuTW9kZWxgcywgdGhpcyBpcyBhIEpTT04gb2JqZWN0LlxuICAgKiBGb3IgVGVuc29yRmxvdy1zdHlsZSBtb2RlbHMgKGUuZy4sIGBTYXZlZE1vZGVsYCksIHRoaXMgaXMgdGhlIEpTT05cbiAgICogZW5jb2Rpbmcgb2YgdGhlIGBHcmFwaERlZmAgcHJvdG9jb2wgYnVmZmVyLlxuICAgKi9cbiAgbW9kZWxUb3BvbG9neT86IHt9fEFycmF5QnVmZmVyO1xuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVkIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBtb2RlbCdzIHRyYWluaW5nLlxuICAgKi9cbiAgdHJhaW5pbmdDb25maWc/OiBUcmFpbmluZ0NvbmZpZztcblxuICAvKipcbiAgICogV2VpZ2h0IHNwZWNpZmljYXRpb25zLlxuICAgKlxuICAgKiBUaGlzIGNvcnJlc3BvbmRzIHRvIHRoZSB3ZWlnaHRzRGF0YSBiZWxvdy5cbiAgICovXG4gIHdlaWdodFNwZWNzPzogV2VpZ2h0c01hbmlmZXN0RW50cnlbXTtcblxuICAvKipcbiAgICogQmluYXJ5IGJ1ZmZlciBmb3IgYWxsIHdlaWdodCB2YWx1ZXMgY29uY2F0ZW5hdGVkIGluIHRoZSBvcmRlciBzcGVjaWZpZWRcbiAgICogYnkgYHdlaWdodFNwZWNzYC5cbiAgICovXG4gIHdlaWdodERhdGE/OiBBcnJheUJ1ZmZlcjtcblxuICAvKipcbiAgICogSGFyZC1jb2RlZCBmb3JtYXQgbmFtZSBmb3IgbW9kZWxzIHNhdmVkIGZyb20gVGVuc29yRmxvdy5qcyBvciBjb252ZXJ0ZWRcbiAgICogYnkgVGVuc29yRmxvdy5qcyBDb252ZXJ0ZXIuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoYXQgbGlicmFyeSBpcyByZXNwb25zaWJsZSBmb3Igb3JpZ2luYWxseSBnZW5lcmF0aW5nIHRoaXMgYXJ0aWZhY3QuXG4gICAqXG4gICAqIFVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy4gRS5nLiwgJ1RlbnNvckZsb3cuanMgdjEuMC4wJy5cbiAgICovXG4gIGdlbmVyYXRlZEJ5Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGF0IGxpYnJhcnkgb3IgdG9vbCBpcyByZXNwb25zaWJsZSBmb3IgY29udmVydGluZyB0aGUgb3JpZ2luYWwgbW9kZWxcbiAgICogdG8gdGhpcyBmb3JtYXQsIGFwcGxpY2FibGUgb25seSBpZiB0aGUgbW9kZWwgaXMgb3V0cHV0IGJ5IGEgY29udmVydGVyLlxuICAgKlxuICAgKiBVc2VkIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuICBFLmcuLCAnVGVuc29yRmxvdy5qcyBDb252ZXJ0ZXIgdjEuMC4wJy5cbiAgICpcbiAgICogQSB2YWx1ZSBvZiBgbnVsbGAgbWVhbnMgdGhlIG1vZGVsIGFydGlmYWN0cyBhcmUgZ2VuZXJhdGVkIHdpdGhvdXQgYW55XG4gICAqIGNvbnZlcnNpb24gcHJvY2VzcyAoZS5nLiwgc2F2ZWQgZGlyZWN0bHkgZnJvbSBhIFRlbnNvckZsb3cuanNcbiAgICogYHRmLkxheWVyc01vZGVsYCBpbnN0YW5jZS4pXG4gICAqL1xuICBjb252ZXJ0ZWRCeT86IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBJbnB1dHMgYW5kIG91dHB1dHMgc2lnbmF0dXJlIGZvciBzYXZlZCBtb2RlbC5cbiAgICovXG4gIHNpZ25hdHVyZT86IHt9O1xuXG4gIC8qKlxuICAgKiBVc2VyLWRlZmluZWQgbWV0YWRhdGEgYWJvdXQgdGhlIG1vZGVsLlxuICAgKi9cbiAgdXNlckRlZmluZWRNZXRhZGF0YT86IHtba2V5OiBzdHJpbmddOiB7fX07XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVyIGZvciB0aGUgbW9kZWwuXG4gICAqL1xuICBtb2RlbEluaXRpYWxpemVyPzoge307XG59XG5cbi8qKlxuICogVGhlIG9uLWRpc2sgZm9ybWF0IG9mIHRoZSBgbW9kZWwuanNvbmAgZmlsZS5cbiAqXG4gKiBURi5qcyAxLjAgYWx3YXlzIHBvcHVsYXRlcyB0aGUgb3B0aW9uYWwgZmllbGRzIHdoZW4gd3JpdGluZyBtb2RlbC5qc29uLlxuICogUHJpb3IgdmVyc2lvbnMgZGlkIG5vdCBwcm92aWRlIHRob3NlIGZpZWxkcy5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIE1vZGVsSlNPTiB7XG4gIC8qKlxuICAgKiBNb2RlbCB0b3BvbG9neS5cbiAgICpcbiAgICogRm9yIEtlcmFzLXN0eWxlIGB0Zi5Nb2RlbGBzLCB0aGlzIGlzIGEgSlNPTiBvYmplY3QuXG4gICAqIEZvciBUZW5zb3JGbG93LXN0eWxlIG1vZGVscyAoZS5nLiwgYFNhdmVkTW9kZWxgKSwgdGhpcyBpcyB0aGUgSlNPTlxuICAgKiBlbmNvZGluZyBvZiB0aGUgYEdyYXBoRGVmYCBwcm90b2NvbCBidWZmZXIuXG4gICAqL1xuICBtb2RlbFRvcG9sb2d5OiB7fTtcblxuICAvKiogTW9kZWwgdHJhaW5pbmcgY29uZmlndXJhdGlvbi4gKi9cbiAgdHJhaW5pbmdDb25maWc/OiBUcmFpbmluZ0NvbmZpZztcblxuICAvKipcbiAgICogV2VpZ2h0cyBtYW5pZmVzdC5cbiAgICpcbiAgICogVGhlIHdlaWdodHMgbWFuaWZlc3QgY29uc2lzdHMgb2YgYW4gb3JkZXJlZCBsaXN0IG9mIHdlaWdodC1tYW5pZmVzdFxuICAgKiBncm91cHMuIEVhY2ggd2VpZ2h0LW1hbmlmZXN0IGdyb3VwIGNvbnNpc3RzIG9mIGEgbnVtYmVyIG9mIHdlaWdodCB2YWx1ZXNcbiAgICogc3RvcmVkIGluIGEgbnVtYmVyIG9mIHBhdGhzLiBTZWUgdGhlIGRvY3VtZW50YXRpb24gb2ZcbiAgICogYFdlaWdodHNNYW5pZmVzdENvbmZpZ2AgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIHdlaWdodHNNYW5pZmVzdDogV2VpZ2h0c01hbmlmZXN0Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBIYXJkLWNvZGVkIGZvcm1hdCBuYW1lIGZvciBtb2RlbHMgc2F2ZWQgZnJvbSBUZW5zb3JGbG93LmpzIG9yIGNvbnZlcnRlZFxuICAgKiBieSBUZW5zb3JGbG93LmpzIENvbnZlcnRlci5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcblxuICAvKipcbiAgICogV2hhdCBsaWJyYXJ5IGlzIHJlc3BvbnNpYmxlIGZvciBvcmlnaW5hbGx5IGdlbmVyYXRpbmcgdGhpcyBhcnRpZmFjdC5cbiAgICpcbiAgICogVXNlZCBmb3IgZGVidWdnaW5nIHB1cnBvc2VzLiBFLmcuLCAnVGVuc29yRmxvdy5qcyB2MS4wLjAnLlxuICAgKi9cbiAgZ2VuZXJhdGVkQnk/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoYXQgbGlicmFyeSBvciB0b29sIGlzIHJlc3BvbnNpYmxlIGZvciBjb252ZXJ0aW5nIHRoZSBvcmlnaW5hbCBtb2RlbFxuICAgKiB0byB0aGlzIGZvcm1hdCwgYXBwbGljYWJsZSBvbmx5IGlmIHRoZSBtb2RlbCBpcyBvdXRwdXQgYnkgYSBjb252ZXJ0ZXIuXG4gICAqXG4gICAqIFVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy4gIEUuZy4sICdUZW5zb3JGbG93LmpzIENvbnZlcnRlciB2MS4wLjAnLlxuICAgKlxuICAgKiBBIHZhbHVlIG9mIGBudWxsYCBtZWFucyB0aGUgbW9kZWwgYXJ0aWZhY3RzIGFyZSBnZW5lcmF0ZWQgd2l0aG91dCBhbnlcbiAgICogY29udmVyc2lvbiBwcm9jZXNzIChlLmcuLCBzYXZlZCBkaXJlY3RseSBmcm9tIGEgVGVuc29yRmxvdy5qc1xuICAgKiBgdGYuTGF5ZXJzTW9kZWxgIGluc3RhbmNlLilcbiAgICovXG4gIGNvbnZlcnRlZEJ5Pzogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIElucHV0cyBhbmQgb3V0cHV0cyBzaWduYXR1cmUgZm9yIHNhdmVkIG1vZGVsLlxuICAgKi9cbiAgc2lnbmF0dXJlPzoge307XG5cbiAgLyoqXG4gICAqIFVzZXItZGVmaW5lZCBtZXRhZGF0YSBhYm91dCB0aGUgbW9kZWwuXG4gICAqL1xuICB1c2VyRGVmaW5lZE1ldGFkYXRhPzoge1trZXk6IHN0cmluZ106IHt9fTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXIgZm9yIHRoZSBtb2RlbC5cbiAgICovXG4gIG1vZGVsSW5pdGlhbGl6ZXI/OiB7fTtcbn1cblxuLyoqXG4gKiBUeXBlIGRlZmluaXRpb24gZm9yIGhhbmRsZXJzIG9mIGxvYWRpbmcgb3BlcmF0aW9ucy5cbiAqL1xuZXhwb3J0IHR5cGUgTG9hZEhhbmRsZXIgPSAoKSA9PiBQcm9taXNlPE1vZGVsQXJ0aWZhY3RzPjtcblxuLyoqXG4gKiBUeXBlIGRlZmluaXRpb24gZm9yIGhhbmRsZXJzIG9mIHNhdmluZyBvcGVyYXRpb25zLlxuICovXG5leHBvcnQgdHlwZSBTYXZlSGFuZGxlciA9IChtb2RlbEFydGlmYWN0OiBNb2RlbEFydGlmYWN0cykgPT5cbiAgICBQcm9taXNlPFNhdmVSZXN1bHQ+O1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBtb2RlbCBpbXBvcnQvZXhwb3J0IGhhbmRsZXIuXG4gKlxuICogVGhlIGBzYXZlYCBhbmQgYGxvYWRgIGhhbmRsZXJzIGFyZSBib3RoIG9wdGlvbmFsLCBpbiBvcmRlciB0byBhbGxvdyBoYW5kbGVyc1xuICogdGhhdCBzdXBwb3J0IG9ubHkgc2F2aW5nIG9yIGxvYWRpbmcuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbnRlcmZhY2UtbmFtZVxuZXhwb3J0IGludGVyZmFjZSBJT0hhbmRsZXIge1xuICBzYXZlPzogU2F2ZUhhbmRsZXI7XG4gIGxvYWQ/OiBMb2FkSGFuZGxlcjtcbn1cblxudHlwZSBQcm9taXNlRnVuY3Rpb24gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHVua25vd24+O1xudHlwZSBTeW5jaWZ5PFQgZXh0ZW5kcyBQcm9taXNlRnVuY3Rpb24+ID0gVCBleHRlbmRzICguLi5hcmdzOiBpbmZlciBBcmdzKVxuICA9PiBQcm9taXNlPGluZmVyIFI+ID8gKC4uLmFyZ3M6IEFyZ3MpID0+IFIgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgSU9IYW5kbGVyU3luYyA9IHtcbiAgW0sgaW4ga2V5b2YgSU9IYW5kbGVyXTogU3luY2lmeTxJT0hhbmRsZXJbS10+XG59O1xuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgdGhlIG1hbmFnZXIgb2YgYSBtb2RlbCBzdG9yZS5cbiAqXG4gKiBBIG1vZGVsIHN0b3JlIGlzIGRlZmluZWQgYXMgYSBzdG9yYWdlIG1lZGl1bSBvbiB3aGljaCBtdWx0aXBsZSBtb2RlbHMgY2FuXG4gKiBiZSBzdG9yZWQuIEVhY2ggc3RvcmVkIG1vZGVsIGhhcyBhIHVuaXF1ZSBgcGF0aGAgYXMgaXRzIGlkZW50aWZpZXIuXG4gKiBBIGBNb2RlbFN0b3JlTWFuYWdlcmAgZm9yIHRoZSBzdG9yZSBhbGxvd3MgYWN0aW9ucyBpbmNsdWRpbmdcbiAqXG4gKiAtIExpc3RpbmcgdGhlIG1vZGVscyBzdG9yZWQgaW4gdGhlIHN0b3JlLlxuICogLSBEZWxldGluZyBhIG1vZGVsIGZyb20gdGhlIHN0b3JlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsU3RvcmVNYW5hZ2VyIHtcbiAgLyoqXG4gICAqIExpc3QgYWxsIG1vZGVscyBpbiB0aGUgbW9kZWwgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgZGljdGlvbmFyeSBtYXBwaW5nIHBhdGhzIG9mIGV4aXN0aW5nIG1vZGVscyB0byB0aGVpclxuICAgKiAgIG1vZGVsIGFydGlmYWN0cyBpbmZvLiBNb2RlbCBhcnRpZmFjdHMgaW5mbyBpbmNsdWRlIHR5cGUgb2YgdGhlIG1vZGVsJ3NcbiAgICogICB0b3BvbG9neSwgYnl0ZSBzaXplcyBvZiB0aGUgdG9wb2xvZ3ksIHdlaWdodHMsIGV0Yy5cbiAgICovXG4gIGxpc3RNb2RlbHMoKTogUHJvbWlzZTx7W3BhdGg6IHN0cmluZ106IE1vZGVsQXJ0aWZhY3RzSW5mb30+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBtb2RlbCBzcGVjaWZpZWQgYnkgYHBhdGhgLlxuICAgKlxuICAgKiBAcGFyYW0gcGF0aFxuICAgKiBAcmV0dXJucyBNb2RlbEFydGlmYWN0c0luZm8gb2YgdGhlIGRlbGV0ZWQgbW9kZWwgKGlmIGFuZCBvbmx5IGlmIGRlbGV0aW9uXG4gICAqICAgaXMgc3VjY2Vzc2Z1bCkuXG4gICAqIEB0aHJvd3MgRXJyb3IgaWYgZGVsZXRpb24gZmFpbHMsIGUuZy4sIGlmIG5vIG1vZGVsIGV4aXN0cyBhdCBgcGF0aGAuXG4gICAqL1xuICByZW1vdmVNb2RlbChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE1vZGVsQXJ0aWZhY3RzSW5mbz47XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHRoZSBwcm9ncmVzcyBvZiBhIGxvbmctcnVubmluZyBhY3Rpb24gc3VjaCBhcyBhbiBIVFRQXG4gKiByZXF1ZXN0IGZvciBhIGxhcmdlIGJpbmFyeSBvYmplY3QuXG4gKlxuICogYGZyYWN0aW9uYCBzaG91bGQgYmUgYSBudW1iZXIgaW4gdGhlIFswLCAxXSBpbnRlcnZhbCwgaW5kaWNhdGluZyBob3dcbiAqIG11Y2ggb2YgdGhlIGFjdGlvbiBoYXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgdHlwZSBPblByb2dyZXNzQ2FsbGJhY2sgPSAoZnJhY3Rpb246IG51bWJlcikgPT4gdm9pZDtcblxuLyoqIEBpbm5hbWVzcGFjZSBpbyAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2FkT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBSZXF1ZXN0SW5pdCAob3B0aW9ucykgZm9yIEhUVFAgcmVxdWVzdHMuXG4gICAqXG4gICAqIEZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB0aGUgc3VwcG9ydGVkIGZpZWxkcywgc2VlXG4gICAqIFtodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUmVxdWVzdC9SZXF1ZXN0XShcbiAgICogICAgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXF1ZXN0L1JlcXVlc3QpXG4gICAqL1xuICByZXF1ZXN0SW5pdD86IFJlcXVlc3RJbml0O1xuXG4gIC8qKlxuICAgKiBQcm9ncmVzcyBjYWxsYmFjay5cbiAgICovXG4gIG9uUHJvZ3Jlc3M/OiBPblByb2dyZXNzQ2FsbGJhY2s7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdXNlZCB0byBvdmVycmlkZSB0aGUgYHdpbmRvdy5mZXRjaGAgZnVuY3Rpb24uXG4gICAqL1xuICBmZXRjaEZ1bmM/OiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogU3RyaWN0IGxvYWRpbmcgbW9kZWw6IHdoZXRoZXIgZXh0cmFuZW91cyB3ZWlnaHRzIG9yIG1pc3NpbmdcbiAgICogd2VpZ2h0cyBzaG91bGQgdHJpZ2dlciBhbiBgRXJyb3JgLlxuICAgKlxuICAgKiBJZiBgdHJ1ZWAsIHJlcXVpcmUgdGhhdCB0aGUgcHJvdmlkZWQgd2VpZ2h0cyBleGFjdGx5IG1hdGNoIHRob3NlXG4gICAqIHJlcXVpcmVkIGJ5IHRoZSBsYXllcnMuIGBmYWxzZWAgbWVhbnMgdGhhdCBib3RoIGV4dHJhIHdlaWdodHNcbiAgICogYW5kIG1pc3Npbmcgd2VpZ2h0cyB3aWxsIGJlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAqXG4gICAqIERlZmF1bHQ6IGB0cnVlYC5cbiAgICovXG4gIHN0cmljdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFBhdGggcHJlZml4IGZvciB3ZWlnaHQgZmlsZXMsIGJ5IGRlZmF1bHQgdGhpcyBpcyBjYWxjdWxhdGVkIGZyb20gdGhlXG4gICAqIHBhdGggb2YgdGhlIG1vZGVsIEpTT04gZmlsZS5cbiAgICpcbiAgICogRm9yIGluc3RhbmNlLCBpZiB0aGUgcGF0aCB0byB0aGUgbW9kZWwgSlNPTiBmaWxlIGlzXG4gICAqIGBodHRwOi8vbG9jYWxob3N0L2Zvby9tb2RlbC5qc29uYCwgdGhlbiB0aGUgZGVmYXVsdCBwYXRoIHByZWZpeCB3aWxsIGJlXG4gICAqIGBodHRwOi8vbG9jYWxob3N0L2Zvby9gLiBJZiBhIHdlaWdodCBmaWxlIGhhcyB0aGUgcGF0aCB2YWx1ZVxuICAgKiBgZ3JvdXAxLXNoYXJkMW9mMmAgaW4gdGhlIHdlaWdodCBtYW5pZmVzdCwgdGhlbiB0aGUgd2VpZ2h0IGZpbGUgd2lsbCBiZVxuICAgKiBsb2FkZWQgZnJvbSBgaHR0cDovL2xvY2FsaG9zdC9mb28vZ3JvdXAxLXNoYXJkMW9mMmAgYnkgZGVmYXVsdC4gSG93ZXZlcixcbiAgICogaWYgeW91IHByb3ZpZGUgYSBgd2VpZ2h0UGF0aFByZWZpeGAgdmFsdWUgb2ZcbiAgICogYGh0dHA6Ly9sb2NhbGhvc3QvZm9vL2FsdC13ZWlnaHRzYCwgdGhlbiB0aGUgd2VpZ2h0IGZpbGUgd2lsbCBiZSBsb2FkZWRcbiAgICogZnJvbSB0aGUgcGF0aCBgaHR0cDovL2xvY2FsaG9zdC9mb28vYWx0LXdlaWdodHMvZ3JvdXAxLXNoYXJkMW9mMmAgaW5zdGVhZC5cbiAgICovXG4gIHdlaWdodFBhdGhQcmVmaXg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIG1vZHVsZSBvciBtb2RlbCBpcyB0byBiZSBsb2FkZWQgZnJvbSBURiBIdWIuXG4gICAqXG4gICAqIFNldHRpbmcgdGhpcyB0byBgdHJ1ZWAgYWxsb3dzIHBhc3NpbmcgYSBURi1IdWIgbW9kdWxlIFVSTCwgb21pdHRpbmcgdGhlXG4gICAqIHN0YW5kYXJkIG1vZGVsIGZpbGUgbmFtZSBhbmQgdGhlIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAqL1xuICBmcm9tVEZIdWI/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBhc3luYyBmdW5jdGlvbiB0byBjb252ZXJ0IHdlaWdodCBmaWxlIG5hbWUgdG8gVVJMLiBUaGUgd2VpZ2h0IGZpbGVcbiAgICogbmFtZXMgYXJlIHN0b3JlZCBpbiBtb2RlbC5qc29uJ3Mgd2VpZ2h0c01hbmlmZXN0LnBhdGhzIGZpZWxkLiBCeSBkZWZhdWx0IHdlXG4gICAqIGNvbnNpZGVyIHdlaWdodCBmaWxlcyBhcmUgY29sb2NhdGVkIHdpdGggdGhlIG1vZGVsLmpzb24gZmlsZS4gRm9yIGV4YW1wbGU6XG4gICAqICAgICBtb2RlbC5qc29uIFVSTDogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tb2RlbHMvMS9tb2RlbC5qc29uXG4gICAqICAgICBncm91cDEtc2hhcmQxb2YxLmJpbiB1cmw6XG4gICAqICAgICAgICBodHRwczovL3d3dy5nb29nbGUuY29tL21vZGVscy8xL2dyb3VwMS1zaGFyZDFvZjEuYmluXG4gICAqXG4gICAqIFdpdGggdGhpcyBmdW5jIHlvdSBjYW4gY29udmVydCB0aGUgd2VpZ2h0IGZpbGUgbmFtZSB0byBhbnkgVVJMLlxuICAgKi9cbiAgd2VpZ2h0VXJsQ29udmVydGVyPzogKHdlaWdodEZpbGVOYW1lOiBzdHJpbmcpID0+IFByb21pc2U8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMgZm9yIFBsYXRmb3JtLmZldGNoXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdERldGFpbHMge1xuICAvKipcbiAgICogSXMgdGhpcyByZXF1ZXN0IGZvciBhIGJpbmFyeSBmaWxlIChhcyBvcHBvc2VkIHRvIGEganNvbiBmaWxlKVxuICAgKi9cbiAgaXNCaW5hcnk/OiBib29sZWFuO1xufVxuIl19