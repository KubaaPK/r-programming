myreddit.controller('mainCtrl', function ($scope, $http) {
	
	$scope.stories = [];

	

	function loadStories(params, callback) {
		$http.get('https://www.reddit.com/r/programming/new/.json', {params: params})
				.success(function(response){
					var stories = [];
					angular.forEach(response.data.children, function(child){
						stories.push(child.data);
					});
					callback(stories);
				});
	}	

	$scope.loadOlderStories = function(){
		var params = {};
		if($scope.stories.length > 0) {
			params['after'] = $scope.stories[$scope.stories.length - 1].name;
		}
		loadStories(params, function(olderStories){
			$scope.stories = $scope.stories.concat(olderStories);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
		
	};
	$scope.loadNewerStories = function() {
		var params = {'before': $scope.stories[0].name};
		loadStories(params, function(newerStories){
			$scope.stories = $scope.stories.concat(newerStories);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

