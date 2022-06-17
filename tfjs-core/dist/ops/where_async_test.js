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
describeWithFlags('whereAsync', ALL_ENVS, () => {
    it('1d tensor', async () => {
        const condition = tf.tensor1d([true, false, true, true], 'bool');
        const res = await tf.whereAsync(condition);
        expect(res.dtype).toBe('int32');
        expect(res.shape).toEqual([3, 1]);
        expectArraysClose(await res.data(), [0, 2, 3]);
    });
    it('2d tensor', async () => {
        const condition = tf.tensor2d([[true, false, false], [false, true, true]], [2, 3], 'bool');
        const res = await tf.whereAsync(condition);
        expect(res.dtype).toBe('int32');
        expect(res.shape).toEqual([3, 2]);
        expectArraysClose(await res.data(), [0, 0, 1, 1, 1, 2]);
    });
    it('3d tensor', async () => {
        const condition = tf.tensor3d([
            [[true, false, false], [false, true, true]],
            [[false, false, false], [true, true, false]]
        ], [2, 2, 3], 'bool');
        const res = await tf.whereAsync(condition);
        expect(res.dtype).toBe('int32');
        expect(res.shape).toEqual([5, 3]);
        expectArraysClose(await res.data(), [0, 0, 0, 0, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 1]);
    });
    it('accepts a tensor-like object', async () => {
        const condition = [true, false, true];
        const res = await tf.whereAsync(condition);
        expect(res.dtype).toBe('int32');
        expect(res.shape).toEqual([2, 1]);
        expectArraysClose(await res.data(), [0, 2]);
    });
    it('throws error if condition is not of type bool', async () => {
        const condition = tf.tensor1d([1, 0, 1]);
        // expect(...).toThrowError() does not support async functions.
        // See https://github.com/jasmine/jasmine/issues/1410
        try {
            await tf.whereAsync(condition);
            throw new Error('The line above should have thrown an error');
        }
        catch (ex) {
            expect(ex.message)
                .toMatch(/Argument 'condition' passed to 'whereAsync' must be bool/);
        }
    });
    it('returns tensor with 0 in shape when no values are true', async () => {
        const condition = [[[false]], [[false]], [[false]]];
        const res = await tf.whereAsync(condition);
        expect(res.dtype).toBe('int32');
        expect(res.shape).toEqual([0, 3]);
        expectArraysClose(await res.data(), []);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlcmVfYXN5bmNfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29yZS9zcmMvb3BzL3doZXJlX2FzeW5jX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUvQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUM3QyxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3pCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRSxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFD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QUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLCtEQUErRDtRQUMvRCxxREFBcUQ7UUFDckQsSUFBSTtZQUNGLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDL0Q7UUFBQyxPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNiLE9BQU8sQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdEUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCAqIGFzIHRmIGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7QUxMX0VOVlMsIGRlc2NyaWJlV2l0aEZsYWdzfSBmcm9tICcuLi9qYXNtaW5lX3V0aWwnO1xuaW1wb3J0IHtleHBlY3RBcnJheXNDbG9zZX0gZnJvbSAnLi4vdGVzdF91dGlsJztcblxuZGVzY3JpYmVXaXRoRmxhZ3MoJ3doZXJlQXN5bmMnLCBBTExfRU5WUywgKCkgPT4ge1xuICBpdCgnMWQgdGVuc29yJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IHRmLnRlbnNvcjFkKFt0cnVlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0sICdib29sJyk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGYud2hlcmVBc3luYyhjb25kaXRpb24pO1xuICAgIGV4cGVjdChyZXMuZHR5cGUpLnRvQmUoJ2ludDMyJyk7XG4gICAgZXhwZWN0KHJlcy5zaGFwZSkudG9FcXVhbChbMywgMV0pO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHJlcy5kYXRhKCksIFswLCAyLCAzXSk7XG4gIH0pO1xuXG4gIGl0KCcyZCB0ZW5zb3InLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29uZGl0aW9uID0gdGYudGVuc29yMmQoXG4gICAgICAgIFtbdHJ1ZSwgZmFsc2UsIGZhbHNlXSwgW2ZhbHNlLCB0cnVlLCB0cnVlXV0sIFsyLCAzXSwgJ2Jvb2wnKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0Zi53aGVyZUFzeW5jKGNvbmRpdGlvbik7XG4gICAgZXhwZWN0KHJlcy5kdHlwZSkudG9CZSgnaW50MzInKTtcbiAgICBleHBlY3QocmVzLnNoYXBlKS50b0VxdWFsKFszLCAyXSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzLmRhdGEoKSwgWzAsIDAsIDEsIDEsIDEsIDJdKTtcbiAgfSk7XG5cbiAgaXQoJzNkIHRlbnNvcicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb25kaXRpb24gPSB0Zi50ZW5zb3IzZChcbiAgICAgICAgW1xuICAgICAgICAgIFtbdHJ1ZSwgZmFsc2UsIGZhbHNlXSwgW2ZhbHNlLCB0cnVlLCB0cnVlXV0sXG4gICAgICAgICAgW1tmYWxzZSwgZmFsc2UsIGZhbHNlXSwgW3RydWUsIHRydWUsIGZhbHNlXV1cbiAgICAgICAgXSxcbiAgICAgICAgWzIsIDIsIDNdLCAnYm9vbCcpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRmLndoZXJlQXN5bmMoY29uZGl0aW9uKTtcbiAgICBleHBlY3QocmVzLmR0eXBlKS50b0JlKCdpbnQzMicpO1xuICAgIGV4cGVjdChyZXMuc2hhcGUpLnRvRXF1YWwoWzUsIDNdKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShcbiAgICAgICAgYXdhaXQgcmVzLmRhdGEoKSwgWzAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDIsIDEsIDEsIDAsIDEsIDEsIDFdKTtcbiAgfSk7XG5cbiAgaXQoJ2FjY2VwdHMgYSB0ZW5zb3ItbGlrZSBvYmplY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29uZGl0aW9uID0gW3RydWUsIGZhbHNlLCB0cnVlXTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0Zi53aGVyZUFzeW5jKGNvbmRpdGlvbik7XG4gICAgZXhwZWN0KHJlcy5kdHlwZSkudG9CZSgnaW50MzInKTtcbiAgICBleHBlY3QocmVzLnNoYXBlKS50b0VxdWFsKFsyLCAxXSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzLmRhdGEoKSwgWzAsIDJdKTtcbiAgfSk7XG5cbiAgaXQoJ3Rocm93cyBlcnJvciBpZiBjb25kaXRpb24gaXMgbm90IG9mIHR5cGUgYm9vbCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb25kaXRpb24gPSB0Zi50ZW5zb3IxZChbMSwgMCwgMV0pO1xuICAgIC8vIGV4cGVjdCguLi4pLnRvVGhyb3dFcnJvcigpIGRvZXMgbm90IHN1cHBvcnQgYXN5bmMgZnVuY3Rpb25zLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzbWluZS9qYXNtaW5lL2lzc3Vlcy8xNDEwXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRmLndoZXJlQXN5bmMoY29uZGl0aW9uKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGxpbmUgYWJvdmUgc2hvdWxkIGhhdmUgdGhyb3duIGFuIGVycm9yJyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGV4cGVjdChleC5tZXNzYWdlKVxuICAgICAgICAgIC50b01hdGNoKC9Bcmd1bWVudCAnY29uZGl0aW9uJyBwYXNzZWQgdG8gJ3doZXJlQXN5bmMnIG11c3QgYmUgYm9vbC8pO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdGVuc29yIHdpdGggMCBpbiBzaGFwZSB3aGVuIG5vIHZhbHVlcyBhcmUgdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb25kaXRpb24gPSBbW1tmYWxzZV1dLCBbW2ZhbHNlXV0sIFtbZmFsc2VdXV07XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGYud2hlcmVBc3luYyhjb25kaXRpb24pO1xuICAgIGV4cGVjdChyZXMuZHR5cGUpLnRvQmUoJ2ludDMyJyk7XG4gICAgZXhwZWN0KHJlcy5zaGFwZSkudG9FcXVhbChbMCwgM10pO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHJlcy5kYXRhKCksIFtdKTtcbiAgfSk7XG59KTtcbiJdfQ==