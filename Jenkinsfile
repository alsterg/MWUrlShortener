@Library('jenkins-shared-library@feature/git-improvements') _
import com.mwam.jenkins.build.*
import com.mwam.jenkins.helpers.S2iBuilderList
import com.mwam.jenkins.helpers.GitTag

// prefix git tags with "build-", so that they do not interfere with gitversion
GitTag.Prefix = "build-"

class BRANCH {
	static final MASTER = "master";
	static final DEVELOP = "develop";
}

// jenkins will build all the branches with "Jenkinsfile" file from the repo
// this list tells jenkins which branches/builds to deploy
def publishBranches = [
  BRANCH.MASTER,
  // BRANCH.DEVELOP
]

def currentBranch = env.BRANCH_NAME

println "currentBranch=$currentBranch"

// https://bitbucket.mwam.local/projects/CORE/repos/jenkins-shared-library/browse/src/com/mwam/jenkins/build/NpmBuild.groovy?at=cdd071be771e6bb227a8e4ccd083b27ca190aec5

def artifactoryPath = "/artifactory/generic-corelib-local/chrome/"

uiBuild = new NpmBuild(artifactoryPath)

automatic_release(uiBuild, publishBranches)
