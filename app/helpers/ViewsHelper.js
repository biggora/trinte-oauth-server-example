/**
 *  Views Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

module.exports = {
        activeIcon: function(active){
           return '<i class="fa fa-'+(active?'check green':'times red')+'"></i>';
        }
};

