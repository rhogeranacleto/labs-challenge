import Twitter from 'twitter';

export const twitterApiFactory = {
	useValue: new Twitter({
		consumer_key: 'qgLeGYxQqhvWbQdF6OIiqWtWT',
		consumer_secret: 'ziMgMl0cKvFjMBt38YktEBWZEvxf8H2hGX6FVRqRMKov9AcC3G',
		access_token_key: '1102436290879021056-p1kIQUtajMbHewD8ELWAFCVm9J4z35',
		access_token_secret: 'O4lQ2VnRAyP507raIWyqEmq9xAo34KSxJMBFOHSkxcJSi',
		bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOlO9gAAAAAAAkwuDuKBCSgaVCsQUeTJEwhlT6Y%3DYJIsPzB9ehFXFZUHwmyRsSDi79p9I9mlyEbUNXdrpagvIhon1z'
	}),
	provide: Twitter
}