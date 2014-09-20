/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "git-check-local-branch",
			"fileName": "git-check-local-branch.js",
			"moduleName": "gitCheckLocalBranch",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/git-check-local-branch.git",
			"isGlobal": "true"
		}
	@end-module-configuration

	@module-documentation:
		
	@end-module-documentation

	@include:
		{
			"git-get-local-branch-list@github.com/volkovasystems": "gitGetLocalBranchList",
			"fs@nodejs": "fs"
		}
	@end-include
*/
var gitCheckLocalBranch = function gitCheckLocalBranch( branchName, repositoryDirectory, callback ){
	/*:
		@meta-configuration:
			{
				"branchName:required": "string",
				"repositoryDirectory:required": "string",
				"callback": "Callback"
			}
		@end-meta-configuration
	*/

	var currentWorkingDirectory = process.cwd( );

	if( GIT_CHECK_LOCAL_BRANCH_DIRECTORY_PATTERN.test( currentWorkingDirectory ) ){
		process.chdir( "../" );
	}

	if( repositoryDirectory && 
		fs.existsSync( repositoryDirectory ) &&
		fs.statSync( repositoryDirectory ).isDirectory( ) )
	{
		process.chdir( repositoryDirectory );

	}else{
		console.warn( "this error is shown for warning purposes only" );
		var error = new Error( "repository directory is invalid" );
		console.error( error );
		console.warn( "reverting to using the parent directory of this module as the repository directory" ); 
	}

	gitGetLocalBranchList( repositoryDirectory,
		function onGitGetLocalBranchList( error, localBranchList ){
			if( error ){
				callback( error, false );

			}else{
				/*:
					@todo:
						This should be replaced with List.contains method.
					@end-todo
				*/
				callback( null, localBranchList.indexOf( branchName ) != -1 );
			}
		} );
};

const GIT_CHECK_LOCAL_BRANCH_DIRECTORY_PATTERN = /git-check-local-branch$/;

var gitGetLocalBranchList = require( "./git-get-local-branch-list/git-get-local-branch-list.js" );
var fs = require( "fs" );

module.exports = gitCheckLocalBranch;