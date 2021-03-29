1. What would you add to your solution if you had more time? 
This is really an open question. I am developing a “widget” in the context of this task but at the same time I am adding all this boilerplate code, groundwork to demonstrate some level of architecture. Seeing this as a greenfield *dashboard* project and not a “widget” one, the list can be really long, but here is a part of the list:

 a) define a component loader that could dynamically get and embed components (dashboard, widgets based on their types), so that the main bundle could be as small as possible, while ensuring that the user retrieves only the code supposed to run.
 
 b)I have one widget in my infrastructure, but unidirectional data flow would be the way to move forward in this context, I guess a real life scenario would be that the same chunk of data needs to be propagated to a chart widget & a grid widget or a bar-graph and it would make sense each widget to subscribe to the source directly to get that data  (ngrx store or apollo probably)
	
	c) add translation capabilities
	
	d) add ghost mode in the widget
	
	e) spend more time in the view (optimize it, create pre-selected themes)
	
	f) componentise the solution further
	
	g) spend time getting a graph widget running against the same set of data
	
	h) add the group button in the orderbook (I’ve never read an orderbook before so I kind of
            realised what this does mid-test)
	
	i) configure more dashboards/exchange pairs

	j) spend more time on the services/websockets code, I’ve worked with REST to a level where
I have contributed on designing & developing frontend REST/PouchDB/Firebase API libraries to feed data to the components so I’d be interested to work on websockets the same way. 

	k) try to play around with private APIs and see how the login sequence can be implemented (seems interesting)
	
	l) build a node.js middleware to exercise basic authentication of users, store dashboard configurations outside of the app (right now the two examples sit in the assets folder).
	
	m) caching
	
	n) The preparation of data seems to be the most intensive work; I’d be tempted to relay that to a web worker and check the trade-off between posting messages & calculations.

2.	What would you have done differently if you knew this page was going to get thousands of views  per second vs per week? 

	Caching is the first thing that pops in my mind, using service workers to lessen the load, and combined with code splitting & proper modularization the loading time could be good enough.

	Also the UI, needs of course uplifting, but caching, optimized loading times & optimizing bundles is the #1 thing in this question.

3.	What was the most useful feature that was added to the latest version of your chosen language? 

	This seems a generic question, as far as Angular goes, one of the latest changes that I am probably a fan is the elvis operator in the typescript side where it turns the code  much more readable:
 
 ```
    this.dashboardName = params?.dashboardName;
 ```

	In this demo I didn’t get the change to use the dynamic import, but here is a screenshot of code I wrote to dynamically import the json-editor package (which is a large one) only when the wrapper component is instantiated (imagine a component portal-json-editor):

	```
	 if (this.data == null) {
	      this.data = {};
	    }
	    import('jsoneditor').then((Editor) => {
	      if (Editor && Editor.default) {
	        this.editor = new Editor.default(this.rootElement.nativeElement, this.options, this.data);
	        if (this.readonly) {
	          this.editor.options.onEditable = () => false;
	        }
	
	        this.initializeAutoExpand();
	      }
	    });
	```
 

	Other useful things in my day today work are string literals, async/await syntactic sugar (if they can be considered new still), the performance upgrade that Ivy brought (well it’s not a useful feature that a developer takes on and uses on a day-to-day but it was a pretty big performance boost from my point of view). 

4.	How would you track down a performance issue in production? Have you ever had to do this? 

	In my current role I was the one that was tasked with looking into several performance issues and brought the findings to the head of development along with solutions on most of them (we have to tip toe around legacy code).

	I mostly profiled via dev tools several scenarios, dived into the large scripting chunks of it, along with running the bundle analyser to find ways to lessen the initial load time.

	Also, Application insights is set up in the webapp where I could get data regarding the traffic.

	The suggestions I made (and got the related JIRAs to implement most of them) were around code-splitting & dynamic loading, changes in imports (especially around pdf.js, json-editor, and lodash functions), modularization of the most common components, and replace jquery expressions with “angular ones”.

	These changes were mostly around architecture.

	The other huge part of the job was change detection (I held a Knowledge Transfer session around that in the company too), some of the changes where the following:

	i)limit change detection via strategy.onPush on most of the widgets, where widgets get manual detect event on data update (given the design of the app, this makes sense)

	ii) create a function pure pipe to run functions in the view, since the change detection issue is not easy to tackle, at least I should make sure we are not running a generateTemplate(htmlcode, data) on every change detection

	iii) mode workload outside of angular zone, such as eventListerens (scroll, resize, document:click)

	iv)debouncers on inputs
	
	v) create a base class that unsubscribes onDestroy from all the subscriptions in the array, to make it easier for other (mostly C#) developers to comply with unsubscribing, all they have to do now is add the subscription to the array.

5.	Can you describe common security concerns to consider for a frontend developer? 

	Input sanitization is the first phrase that popped in my head, especially if there is a need to render HTML via innerHTML, angular safehtml pipe should be used.

	We should also avoid running eval() on data that could come from the user, a successful XSS attack could be the result of that.

	HtttpClient seems fully fit to defend against CSFR and XSS atacks though.

	On a more generic discussion, a frontend developer, apart from the input-related issues, should be concerned as to where the sensitive data re being stored, localstorage is easily accessible, so this is not the place for such data, session storage is a better place, using https, authenticating, checking access rights based on the permissions (e.g. from JWT token).


6.	How would you improve the API that you just used? 

	I don’t think the short time I spend looking into the public feed is enough for me to make suggestions, one thing that came to me was to include the grouping level in the orders, but then again, that would mean that the widgets targeting the same data might end up requiring different data streams which is not great at best.
