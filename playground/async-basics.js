console.log('Starting App');

setTimeout(()=>{
  console.log('Inside of Call back');
}, 2000);

setTimeout(()=>{console.log('2nd timeout');}, 0);
console.log('Finishing App');