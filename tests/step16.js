/*
  In this step, you'll implement a feature that shows the duration of the
  currently playing song. If you click on it, it should hide the total duration
  and show the time remaining.

  Remember, if you want to reference the duration in your template, you should
  use `view.duration`.

  By now, this should be a pretty simple feature for you to implement. Just use
  the concepts you put to use yesterday.

  To increase the challenge, this time, you'll be writing your own tests. First,
  write a test to describe the feature. Then, begin implementing it until all
  of your tests pass.

  Here are a couple things we suggest you test:

  * If no song is playing, the current time should not appear.
  * When you play a song, the current time should appear in the Now Playing panel.
  * When you click on the current time, it should show the remaining time.

  Note: You'll probably need to use jQuery to set up a listener to know when the
  song has loaded. Because these tests are asynchronous, make sure you use QUnit's
  start() and stop() methods. If you finish this early, you should write a helper
  to clean up this code.

  Good luck!
*/

step(16, "Click to Toggle Remaining Time");

// Unit tests of toggleTime in isolation
testComponent('toggleTime', 'remainingTime should be total minus current', function (component) {
  Ember.run(function() {
    component.set('duration', 10);
    component.set('currentTime', 3)
  });

  strictEqual(component.get('remainingTime'), 7);
});

testComponent('toggleTime', 'with showingCurrent true, currentTime should be displayed', function (component) {
  Ember.run(function() {
    component.set('showingCurrent', true);
  });

  strictEqual(component.$('.currentTime').length, 1);
});

testComponent('toggleTime', 'with showingCurrent false, remainingTime should be displayed', function (component) {
  Ember.run(function() {
    component.set('showingCurrent', false);
  });

  strictEqual(component.$('.remainingTime').length, 1);
});

testComponent('toggleTime', 'calling toggleTime should swap showingCurrent', function (component) {
  Ember.run(function() {
    component.set('showingCurrent', false);

    component.toggleTime();
    ok(component.get('showingCurrent'), "started as false, should be true after one toggle");


    component.toggleTime();
    ok(!component.get('showingCurrent'), "started as false, should be false again after two toggles");
  });
});

// Integration tests inside audioPlayer
testComponent('audioPlayer', 'If no song is playing, the current time should not appear.', function (component) {
  strictEqual(component.$('.currentTime').length, 0);
});

testComponent('audioPlayer', 'When you play a song, the current time should appear in the Now Playing panel.', function (component) {
  Ember.run(function() {
    component.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(component, 'isPlaying').then(function() {
    strictEqual(component.$('.currentTime').length, 1);
    strictEqual(component.$('.remainingTime').length, 0);
  });
});

testComponent('audioPlayer', 'When you click on the current time, it should show the remaining time.', function (component) {
  Ember.run(function() {
    component.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(component, 'isPlaying').then(function() {
    click('.currentTime', component);
  }).then(function() {
    strictEqual(component.$('.currentTime').length, 0);
    strictEqual(component.$('.remainingTime').length, 1);
  });
});
