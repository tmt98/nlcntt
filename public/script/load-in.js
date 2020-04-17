//-------------------------------------//
// hack CodePen to load pens as pages

var nextPenSlugs = [
    '3d9a3b8092ebcf9bc4a72672b81df1ac',
    '2cde50c59ea73c47aec5bd26343ce287',
    'd83110c5f71ea23ba5800b6b1a4a95c4',
  ];
  
  function getPenPath() {
    var slug = nextPenSlugs[ this.loadCount ];
    if ( slug ) {
      return 'https://s.codepen.io/desandro/debug/' + slug;
    }
  }
  
  //-------------------------------------//
  // init Infinte Scroll
  
  var infScroll = new InfiniteScroll( '.container', {
    path: getPenPath,
    append: '.post',
    status: '.page-load-status',
  });
  
  var statusBar = document.querySelector('.status-bar');
  
  infScroll.on( 'load', function() {
    statusBar.textContent = infScroll.loadCount + ' pages loaded';
  });