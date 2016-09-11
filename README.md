# Github-Issue-Tracker
This was a programming assignment for a job (Software Developer) @ shippable.com

### Live Application
Website is live at [Heroku]

Now also available on http://harryi3t.github.io/Github-Issue-Tracker/

## Explanation to Solution
When the user inputs the ``` url ```, it's matched using regex. Follwing patterns are allowed
``` 
 - http://github.com/[user]/repository
 - https://github.com/[user]/repository
 - github.com/[user]/repository
```

If the input is matched then the ``` [user]/[repository]  ``` part is used to send the ajax request to ``` api.github.com/ ```.
Since Github API by default sends 30 result per request so to minimize the no. of requests we are also sending an additional parameter ``` per_page = 100``` which is maximum that is allowed.

Since the no. of Issues can be more than 100, so we have to make multiple requests. This can be achived by sending an additional parameter ``` page = x``` where x is the page number.

We keep sending the requests until we receive less than 100 items.


[Heroku]: https://github-ticket-tracker.herokuapp.com/
