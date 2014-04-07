digitalprivacynotice --- Online digital privacy notice based on joint ONC/OCR model NPP project content
=======================================================================================================
# SYNOPSIS

This node.js module provides a standardized online notice of Privacy Practice. The HIPAA Privacy Rule gives individuals a fundamental right to be informed of the privacy practices of health plans and health care providers, as well as to be informed of their privacy rights with respect to their personal health information. Health plans and covered health care providers are required to develop and distribute a notice that provides a clear, user friendly explanation of these rights and practices.

The Office of the National Coordinator for Health Information Technology (ONC) has developed model notices of privacy practices (NPP) that clearly convey the required information to patients in an accessible format. These model notices can be customized by covered entities (doctors, hospitals and other health care providers covered by HIPAA who maintain patient data, health plans) and then printed for office display, distributed to patients or made available online on the providers websites.

This application provides the on-line version of the above mentioned model notices of privacy practices (NPP) that can be integrated with existing web sites of Health Care and Health Plan providers.

# System Requirements
This node.js module requires server side deployment and has following dependencies.

## Server side required software
1. node.js - node.js engine can be downloaded and installed from [http://nodejs.org](http://nodejs.org)
2. npm (Node Package Manager) - can be downloaded and installed from [http://www.npmjs.org ] (http://www.npmjs.org)

## Server side operating systems
All the server side operating systems that are supported by **node.js ** are supported by this digitalprivacynotice module. Following is the list of supported server operating systems-

1. Windows, 32-bit, 64-bit
2. Mac OS X 32 bit, 64-bit
3. Linux 32-bit, 64 bit
4. SunOS 32-bit, 64-bit

## List of Supported Browsers (for client side/ end user or patient )
Most of the browsers are supported by this application. Older browsers are also supported. For very old browsers like IE 6 & 7, there are options to downgrade gracefully. 

### Internet Explorer 

Supported IE versions are :

1. Internet Explorer 11
2. Internet Explorer 10
3. Internet Explorer 9
4. Internet Explorer 8
5. Internet Explorer 7 (No support for tab view. Supports alternate scrollable page view.)
6. Internet Explorer 6 (No support for tab view. Support alternate scrollable page view.)

Older versions of Internet Explorer IE 6 & IE 7 does not support the default 'tab' view of the Digital Privacy Notice. The Health Care and Health Plan provider whose web sites support IE 6 &  IE 7 can optionally switch down to ' scrollable page' view. The instructions to force 'scrollable page' view is given under section [Usage instructions][].

### Mozilla Firefox
Firefox version 3 and above.

### Google Chrome
Google Chrome version 14 and above.

### Apple Safari browser
Safari version 4 and above.

### Opera Browser
Opera version 10 and above.

## Mobile Platforms
1. iPhone -Apple iOS
2. iPad - Apple iOS
3. Android based phones
4. Android based tablets

# Installation Instructions
This software is packaged as a node.js module. Following steps should be followed for installation-

1. Meet server side operating system requirements for node.js

	Refer to section [Server side operating systems][] and [Server side required software][]. 
2. Install node.js and npm 

3. Install digitalprivacynotice module using npm install

	digitalprivacynotice node.js module (this application) can be installed using npm - node package manager. It is available as [digitalprivacynotice module on npm https://www.npmjs.org/package/digitalprivacynotice] (https://www.npmjs.org/package/digitalprivacynotice).


For global install on the server

`npm -g install digitalprivacynotice`

For local install in the current user directory

`npm install digitalprivacynotice`

This module is installed as a folder 'digitalprivacynotice' under 
'node_modules'.

# Usage Instructions
## Server side invocation
This module can be invoked as 

`digitalprivacynotice <port> <provider type: -hc or -hp> -p <language: -en or -es> `
	
This module has following **mandatory** parameters:


* **port : **allows binding the digitalprivacynotice module to a specific server port
* **provider type : **allows the provider organization to chose which of the online notice should be served based on its own identity type. 
	* -hc : For healthcare provider
	* -hp : For health plan provider


**Optional parameters:**

* Page view : **By default the rendered view is tabbed view.** 
	* If ‘–p’ option is **not** provided, default tabbed view is presented
	* If ‘-p’ option is provided, then single page scrollable view of online 	privacy notice is presented
* Language : **if this optional parameter is provided then either of ‘–en’ or ‘-es’ should be entered**.
	* If this parameter is not provided, then the 	language of the online privacy notice to be served is chosen at runtime based on language setting of the patient web browser
	* If ‘-en’ option is provided, then the online privacy notice is served in 	English, irrespective of browser setting of the patient.
	* If ‘-es’ option is provided, then online privacy notice is served in 	Spanish, irrespective of browser setting of the patient.
	
## Content customization by Health Care or Health Plan provider entities
Health Care or Health Plan provider entities can customize the content in the model notice of the privacy practices (NPP) by updating a set of text files in the digitalprivacynotice installed directory.

* The module supports easy customization of content by simple edit of plain text files. You can optionally add HTML tags to provide page breaks and styling.
* This module support provider specific instructions unique for Health Care providers and Health Plan providers
* For each type of providers, instruction in English and Spanish can be customized
* Provider entities can leave the files empty if they do not want to provide specific instructions. **DO NOT DELETE ANY OF THE INSTRUCTION TEXT FILES.**

The path of the instruction files is under installed folder at **'..../node_modules/digitalprivacynotice/lib/instructions'**.
There are two set of folder under this directory  -

1. **hc** - contains two folders, one for English **'EN'** and the other for Spanish **'ES'**. Each of these folders contain text files for instructions A to H for Health Care provider.
2. **hp** - contains two folders, one for English **'EN' **and the other for Spanish **'ES'**. Each of these folders contain text files for instructions A to H for Health Plan provider.


Following set of text files exists under language specific folders ( EN and ES ) for instruction A to H in respective language.

1. InstructionA.txt
2. InstructionB.txt
3. InstructionC.txt
4. InstructionD.txt
5. InstructionE.txt
6. InstructionF.txt
7. InstructionG.txt
8. InstructionH.txt


## Access of the digital privacy notice by patient
The provider entity ( Health Care or Health Plan provider) can link the digitalprivacynotice node.js module running on the server as a URL resource in their existing web sites. For example , if the digitalprivacynotice is running on port 8080 on server named 'myserver' then the link to be embedded will be `http://myserver:8080`.  The patient consumes the model notices of privacy practice by browsing these links.

digitalprivacynotice module provides multiple runtime invocation options to the provider entity  to fit its needs for the existing websites, its website's system requirements and the patient population served by it. These various options are mentioned in the section [Server side invocation] []. Below is an exhaustive list of **example** of of all possible combinations of available while operating digitalprivacynotice module.

* Running digitalprivacynotice service on port 8811 for **Health Care provider** entity with default tab view and browser dependent choice of language.

	`digitalprivacynotice 8811 -hc `
	
* Running digitalprivacynotice service on port 8812 for **Health Care provider** entity with default tab view and forced language choice of English by provider.	

	`digitalprivacynotice 8812 -hc -en `
		
* Running digitalprivacynotice service on port 8813 for **Health Care provider** entity with default tab view and forced language choice of Spanish by provider.

	`digitalprivacynotice 8813 -hc -es `
		
* Running digitalprivacynotice service on port 8814 for **Health Care provider** entity with scrollable page view and browser dependent choice of language.

	`digitalprivacynotice 8814 -hc -p `
	
* Running digitalprivacynotice service on port 8815 for **Health Care provider** entity with scrollable page view and forced language choice of English by provider.	
	
	`nohup digitalprivacynotice 8815 -hc -p -en `

* Running digitalprivacynotice service on port 8816 for **Health Care provider** entity with scrollable page view and forced language choice of Spanish by provider.	

	`nohup digitalprivacynotice 8816 -hc -p -es `
	
* Running digitalprivacynotice service on port 8817 for **Health Plan provider** entity with default tab view and browser dependent choice of language.

	`nohup digitalprivacynotice 8817 -hp `

* Running digitalprivacynotice service on port 8818 for **Health Plan provider** entity with default tab view and forced language choice of English by provider.
	
	`nohup digitalprivacynotice 8818 -hp -en `
	
* Running digitalprivacynotice service on port 8819 for **Health Plan provider** entity with default tab view and forced language choice of Spanish by provider.	

	`nohup digitalprivacynotice 8819 -hp -es `

* Running digitalprivacynotice service on port 8820 for **Health Plan provider** entity with scrollable page view and browser dependent choice of language.

	`nohup digitalprivacynotice 8820 -hp -p `
	
* Running digitalprivacynotice service on port 8821 for **Health Plan provider** entity with scrollable page view and forced language choice of English by provider.	

	`nohup digitalprivacynotice 8821 -hp -p -en `

* Running digitalprivacynotice service on port 8822 for **Health Plan provider** entity with scrollable page view and forced language choice of Spanish by provider.

	`nohup digitalprivacynotice 8822 -hp -p -es `

 
