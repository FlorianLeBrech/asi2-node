var method = ContentModel.prototype;
//à changer
function ContentModel (type,id,title,src,fileName,data) {
    this.type = type;
    this.id = id;
    this.title = title;
    this.src = src;
    this.fileName = fileName;
    this.data = data;    
}


method.create = function(ContentModel,callback) {

};
method.read = function(id,callback) {
    
};
method.update = function(content,callback) {
    
};
method.delete = function(id,callback) {
    
};

module.exports = ContentModel;