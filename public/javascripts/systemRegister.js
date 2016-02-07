System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

switch (document.location.pathname){
	case '/':
		System.import('appBuilt/app.component').then(null, console.error.bind(console));
		break;
	case '/login':
		System.import('appBuilt/login.form.component').then(null, console.error.bind(console));
}
