var onlyNumbers = function (e)
	{
		var keynum;
		var keychar;
		var numcheck;
	//compatible concerns
		if(window.event) // IE
		  {
		    keynum = e.keyCode;
		  }
		else if(e.which) // Netscape/Firefox/Opera
		  {
		   keynum = e.which;
		  }

		keychar = String.fromCharCode(keynum);
		numcheck = /\d/;
		return numcheck.test(keychar);
	}

var cartController = function($scope){
	//order configure
	$scope.orderType = 'id';
	$scope.order = '-';
	$scope.changeOrder = function(type){
		$scope.orderType = type;
		if($scope.order){
			$scope.order = '';
		}else{
			$scope.order = '-';
		}
	}
	//end of order configure
	
	//show the current time and date
	$scope.date = (new Date()).toString();
	setInterval(function(){
		$scope.$apply(function(){
			$scope.date = (new Date()).toString();
		});
	},1000)



	$scope.totalPrice = function(){
		var total = 0;
		angular.forEach($scope.cart, function(item){
			total += item.quantity * item.price;
		});
		return total;
	}

	$scope.totalQuatities = function(){
		var total = 0;
		angular.forEach($scope.cart, function(item){
			total += parseInt(item.quantity) ;
		});
		return total;
	}
//remove one item
	$scope.remove = function(id){
		var index = findIndex(id);

		if(index != -1){
			$scope.cart.splice(index,1);
		}
	}
//find the index of a element
	var findIndex = function(id){
		var index = -1;
		angular.forEach($scope.cart, function(item,key){
			if (item.id == id) {
				index = key;
			}
		});
		return index;
	}
//increase the quantity of an item
	$scope.add = function(id){
		var index = findIndex(id);
		if(index != -1){
			++$scope.cart[index].quantity;
		}
	}
	$scope.$watch('cart', function(newValue, oldValue){
		angular.forEach(newValue,function(item,key){
			if (item.quantity < 1) {
				var returnKey = confirm('remove the product?');
				if(returnKey){
					$scope.remove(item.id);
				}else{
					item.quantity = oldValue[key].quantity;
				}
			}
		})
	},true);
//decrease the number of item
	$scope.reduce = function(id){
		var index = findIndex(id);
		if(index != -1){
			var item = $scope.cart[index];
			if(item.quantity > 1){
				--item.quantity;
			}else{
				var returnKey = confirm('remove the product?');
				if(returnKey){
					$scope.remove(id);
				}
			}
		}	
	}

	$scope.cart = [{
			id: 2004, 
			name:'iphone 5',
			quantity: 2,
			price: 500
		},
		{
			id: 11, 
			name:'iphone 5s',
			quantity: 12,
			price: 550
		},
		{
			id: 1002, 
			name:'iphone 6',
			quantity: 3,
			price: 600
		},
		{
			id: 903, 
			name:'iphone 6s',
			quantity: 7,
			price: 650
		},
		{
			id: 764, 
			name:'mac',
			quantity: 4,
			price: 1160
		},
		{
			id: 1825, 
			name:'Nexus 5',
			quantity: 6,
			price: 480
		},
		{
			id: 6, 
			name:'Thinkpad',
			quantity: 9,
			price: 1060
		}
	];
}