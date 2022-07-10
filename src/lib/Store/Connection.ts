import JsStore from 'jsstore';
import workerInjector from 'jsstore/dist/worker_injector';
const getWorkerPath = () => {
  return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
};
const workerPath = getWorkerPath().default;

export const Connection = window.Worker
  ? new JsStore.Connection(new Worker(workerPath))
  : new JsStore.Connection().addPlugin(workerInjector);
