self.addEventListener("message", (e: MessageEvent<string>) => {
  console.log(e.data);
  self.postMessage("Hello from worker");
});
