hello



app.post('/UrlVirginie', function (req, res) {
    var post = req.body;
    if (!!post.user) {
      req.session.user_id = post.userId;
      req.session.role = post.role;
      if (post.role=="admin"){
        res.redirect('/admin');        
      }
      else {
            res.redirect('/watch');        
      }
    } else {
      res.send('Bad user/pass');
    }
  });