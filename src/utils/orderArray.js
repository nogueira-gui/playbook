const orderArray = (list) => {
    var pos = null;
    for(var i = list.length; i > -1; i--){
        for(var k = list.length; k > -1 ; k--){
            if(list[i] > list[k]){
                pos = list[i];
                list[i] = list[k];
                list[k] = pos;
            }
        }
      }
      return list;
}
export default orderArray;