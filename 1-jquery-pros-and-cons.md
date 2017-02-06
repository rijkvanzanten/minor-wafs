# The pros and cons of jQuery
_And other JS libraries for that matter_

From the [official jQuery documentation](https://jquery.com):
> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

## Pros
The best thing about jQuery is it's feature-rich abstraction layer on top of some of the most verbose tasks in JS, HTML and even styling animations. 
Web development projects are often bound to budgets and developers have to be able to do a lot of work in the least amount of time. jQuery is the most practical solution to quite a lot of common technical challenges like performing AJAX requests.

A lot of people like jQuery because<sup>1</sup>:
* The support of the community is great
* It makes DOM manipulation painless
* It plays well with AJAX
* It makes basic animation a piece of cake
* Set selection is painless
* There are plug-ins
* Bugs get identified and fixed quickly

The best part of all this is the fact that jQuery is completely free to use, distribute and modify. This allows developers to use jQuery in any way they want to. 

## Cons
Often, developers include the whole jQuery library to be able to use only some of it features. This will result in having a lot of overhead for functionality that could've easily been implemented otherwise. A lot of the most-used jQuery features can be done natively in the browser nowadays. jQuery was a big help back when `document.querySelector()` or `fetch()` weren't available. These native methods are often way faster then the 'old' jQuery methods which in turn use even older native JS techniques.

Next to being quite big and often slower than native methods there's one major reason not to use jQuery anymore.

To avoid extending the native element prototypes, jQuery uses its own wrapper objects<sup>2</sup>. Extending native JS-objects is mostly considered bad practice. It often leads to memory leaks or collides with native functionality. When you select an element with fe `$('header')`, jQuery doesn't return an element or NodeList but a jQuery Object. This means that jQuery provides completely different methods on elements than a regular reference to a DOM element. However, you'll need the reference to the element more often than not. When using jQuery for extensive DOM manipulation you'll always end up with code that mixes jQuery objects, native elements and NodeLists. 🍝
It's extremely difficult to succesfully refactor jQuery out of code.

<hr />

1: [jQuery: the good, the bad & the ugly](http://www.webdesignerdepot.com/2012/09/jquery-the-good-the-bad-and-the-ugly/)
2: [jQuery considered harmful](http://lea.verou.me/2015/04/jquery-considered-harmful/)
