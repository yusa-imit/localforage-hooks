import JsStore from 'jsstore';
export default abstract class Connection {
  static get() {
    return window.Worker
      ? new JsStore.Connection(
          new Worker(
            require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js').default
          )
        )
      : new JsStore.Connection().addPlugin(
          require('jsstore/dist/worker_injector')
        );
  }
}
