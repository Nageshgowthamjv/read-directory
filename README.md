# read-directory
Read Directory Class to return the contents of the directory

### Usage
1. require the class
2. initialize
3. call the method readDirAsync or readDirSync

```javascript

          var DirReaderSync = require('./dir-reader-sync');
          let rdSync = new DirReaderSync();
          var result = rdSync.readDirSync('./a');

          var DirReaderAsync = require('./dir-reader-async');
          let rdAsync = new DirReaderAsync();
          rdAsync.readDirAsync('./a', function(err, result) {
               //body
          });
	    
```

### Response template:
```javascript
      {
        filenames: [<file-names>],
        dirnames: [<dir-names>]
      }
```
## APIs Avaialble

### DirReaderSync
  Reads the contents of a directory Synchronously.
  * path _String_
  
  _Example_: 
  ```javascript
      rd.readDirSync(path);
  ```
  
  ### DirReaderAsync
  Reads the contents of a directory Asynchronously.
  * path _String_
  
  _Example_: 
  ```javascript
      rd.readDirAsync(path);
  ```
 ## Command Prompt
 
 	1. node readdir <dir>             //default is "-async"
	2. node readdir <dir> -sync
	3. node readdir <dir> -async

 
  
  ### Requirements
    "node": ">=6.11.0"
    
  ### Installation
      1. clone the repository.
      2. run the command `npm install`
  
  ### Running Testcases
      1. `Mocha`, `Chai`, `chai-spies` and `mock-fs` are used for testing the code.
      2. run the command `npm test` to see the test results.
      
#### Test logs
-----
```
                    
          > read-directory@1.0.0 test E:\Git\read-directory
          > mocha tests/*.js



            Testing the Class - DirReaderAsync
              +ve Testcases : Reading the root dir
                √  +ve: Testing the instance of the Class ReadDirAsync
                √  +ve: Tesing the property dirnames exists after instantiation
                √  +ve: Tesing the property filenames exists after instantiation
                √  +ve: Test reading with root dir
                √  +ve: Test reading with sub-dir
                √  +ve: Test reading with sub-dir having file with no file-type
                √  +ve: Test reading with sub-dir having no data  returns an empty object
                √ +ve: Test the no. of times the function readDirAsync is called
              -ve Testcases : Reading the root dir
                √  -ve: Test reading invalid dir
                √  -ve: Test reading invalid sub-dir
                √  -ve: Test reading existing file instead of directory
                √  -ve: Test reading non-existing file instead of directory

            Testing the Class - DirReaderSync
              +ve Testcases : Reading the root dir
                √  +ve: Testing the instance of the Class DirReaderSync
                √  +ve: Tesing the property dirnames exists after instantiation
                √  +ve: Tesing the property filenames exists after instantiation
                √  +ve: Test reading with root dir
                √  +ve: Test reading with sub-dir
                √  +ve: Test reading with sub-dir having file with no file-type
                √  +ve: Test reading with sub-dir having no data  returns an empty object
                √ +ve: Test the no. of times the function readDirSync is called
              -ve Testcases : Reading the root dir
                √  -ve: Test reading invalid dir
                √  -ve: Test reading invalid sub-dir
                √  -ve: Test reading existing file instead of directory
                √  -ve: Test reading non-existing file instead of directory


            24 passing (90ms)

```
      
 ### Roadmap
      1. Adding filters with file types.
      2. Adding level constraints for directories.
      
 ### No hours spent: 7hrs
