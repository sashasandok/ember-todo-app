import { module, test } from 'qunit';
import { setupTest } from 'ember-todo-app/tests/helpers';

module('Unit | Route | active', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:active');
    assert.ok(route);
  });
});
