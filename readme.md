# MWUrlShortener

## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```


### signing the extension
crx3 node package creates crx file just fine:
https://www.npmjs.com/package/crx3
PS C:\bitbucket\Ops\short-disclosure-declaration-tool\chromeExtension> cat .\artifacts\short-disclosure-declaration-tool-v3.3.0-production.zip | node node_modules/crx3/bin/crx3 --key artifacts/key.pem --crx artifacts/extension-v3.3.0.crx
or
PS C:\bitbucket\Ops\short-disclosure-declaration-tool\chromeExtension> node node_modules/crx3/bin/crx3 --key artifacts/key.pem --crx artifacts/extension-v3.3.0.crx artifacts/short-disclosure-declaration-tool-v3.3.0-production

earlier on:
I generated sample key.pem and key.crx files using chrome
http://www.dre.vanderbilt.edu/~schmidt/android/android-4.0/external/chromium/chrome/common/extensions/docs/packaging.html

packaging script:
http://www.dre.vanderbilt.edu/~schmidt/android/android-4.0/external/chromium/chrome/common/extensions/docs/crx.html

### crx build
build.sh executes in jenkins and creates a crx file

encryption key for building the crx file is stored in secret server: https://p-eu-secretserver.prod.mwam.local/app/#/secret/12995/general

https://confluence.mwam.local/display/LFD/How+to+Securely+Access+Credentials+and+Other+Secrets

create the secret from a key.pem file:
$ createsealed -f crxkey -n SDDT -ns mwam-build-finops-test crxkey=key.pem

put the secret here:
https://bitbucket.mwam.local/projects/FLUX/repos/gitops-system/browse/test/build/finops/secrets.yaml

NpmBuild.groovy https://bitbucket.mwam.local/projects/CORE/repos/jenkins-shared-library/browse/src/com/mwam/jenkins/build/NpmBuild.groovy?at=mborzeck/npmbuild
has "mountPath": "/opt/app-root/sddt-crx-key.pem"

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
