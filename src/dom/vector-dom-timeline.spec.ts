import {
  VectorDomTimeline,
  VectorDomTimelineObject,
} from './vector-dom-timeline';
import test from 'ava';

/**
 * Check that story board appends 0 and 1 progress
 */
test('generateStoryboard', t => {
  const keys: Array<keyof VectorDomTimelineObject> = ['alpha'];
  const testTimeline = [
    {progress: 0.2, alpha: 0},
    {progress: 0.5},
    {progress: 0.8, alpha: 0.6},
  ];

  const result = VectorDomTimeline.generateStoryboard(keys, testTimeline);
  const expected = {
    alpha: [
      {progress: 0, alpha: 0},
      {progress: 0.2, alpha: 0},
      {progress: 0.8, alpha: 0.6},
      {progress: 1, alpha: 0.6},
    ],
  };

  t.deepEqual(result, expected);
});

test('getStartAndEndTimelineFromStoryboard', t => {
  const storyboard = {
    alpha: [
      {progress: 0, alpha: 0},
      {progress: 0.2, alpha: 0},
      {progress: 0.8, alpha: 0.6},
      {progress: 1, alpha: 0.6},
    ],
  };

  t.deepEqual(
    VectorDomTimeline.getStartAndEndTimelineFromStoryboard(
      storyboard,
      'alpha',
      0
    ),
    {
      start: {progress: 0, alpha: 0},
      end: {progress: 0.2, alpha: 0},
    }
  );

  t.deepEqual(
    VectorDomTimeline.getStartAndEndTimelineFromStoryboard(
      storyboard,
      'alpha',
      0.2
    ),
    {
      start: {progress: 0, alpha: 0},
      end: {progress: 0.2, alpha: 0},
    }
  );

  t.deepEqual(
    VectorDomTimeline.getStartAndEndTimelineFromStoryboard(
      storyboard,
      'alpha',
      0.21
    ),
    {
      start: {progress: 0.2, alpha: 0},
      end: {progress: 0.8, alpha: 0.6},
    }
  );
  t.deepEqual(
    VectorDomTimeline.getStartAndEndTimelineFromStoryboard(
      storyboard,
      'alpha',
      0.5
    ),
    {
      start: {progress: 0.2, alpha: 0},
      end: {progress: 0.8, alpha: 0.6},
    }
  );
  t.deepEqual(
    VectorDomTimeline.getStartAndEndTimelineFromStoryboard(
      storyboard,
      'alpha',
      1
    ),
    {
      start: {progress: 0.8, alpha: 0.6},
      end: {progress: 1, alpha: 0.6},
    }
  );
});
