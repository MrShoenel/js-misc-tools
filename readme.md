# misc-tools
A collection of tools that are needed every now and then. Some tools are just (modern async) wrappers around existing tools.

## Install via npm <span style="vertical-align:middle">[![Current Version](https://img.shields.io/npm/v/sh.misc-tools.svg)](https://www.npmjs.com/package/sh.misc-tools)</span>
`npm install sh.misc-tools`

## Included Tools
Currently, this collection includes the following:
* __FTP-Tools__ (note the returned Client is the instance of the package `ftp`):
  * __`async connectFtp(options) => Promise.<Client>`__
  * __`async mkdirFtp(client, directory, recursive = true) => Promise.<Client>`__
  * __`async uploadFtpFile(client, localFile, remoteFile, mkdirP = true) => Promise.<Client>`__
  * __`async connectFtpUploadClose(opts, localFile, remoteFile, mkdirP = true) => Promise.<void>`__ Connect to server, upload the file, disconnect
* __Network-Tools__:
  * __`async pingPort(host, port, timeout = 500, family = 4) => Promise.<void>`__ Attempts to open a Socket to `host:port` and resolves if it worked within `timeout`; rejects, otherwise.
  * __`async tryPingPort(host, port, timeout = 500, family = 4) => Promise.<boolean>`__ Like 'pingPort()', but _always_ resolves with a `boolean`.
* __Miscellaneous-Tools__:
  * __`async timeout(milliSeconds) => Promise.<void>`__
  * __`async attempt.<T>(asyncFn, maxNumTries = 3, timeoutMsecs = -1) => Promise.<T>`__ Attempts another async function for the given amount of times with an optional timeout in between
* __FS-Tools__:
  * __`async probeDir(dir) => Promise.<Array.<string>>`__ Checks if a directory is readable and returns the contained files/folders
  * __`async moveFileByCopy(src, dst) => Promise.<void>`__
  * __`async renameFile(src, dst) => Promise.<void>`__
  * __`async unlinkFile(src) => Promise.<void>`__
