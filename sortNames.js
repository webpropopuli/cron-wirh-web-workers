// Return a sorted list of names

onmessage = function(e) {
  //! Read data sent from caller
  const { names } = e.data;
  console.log(`Got < ${names} > from caller`);

  //! This is the 'work'
  const mySort = (a, b) =>
    a.toLowerCase() > b.toLowerCase() ? 1 : b > a ? -1 : 0;
  const sortedArr = names.sort(mySort);

  //! Build the msg to send back and post it
  var workerResult = { Result: sortedNames };
  postMessage(workerResult);
  self.stop(); // goodbye cruel world....
};
