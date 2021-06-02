/**
 *  分页组件
 *  使用示例：
    var pager = Object.create(pager); 
    pager.init({
        pageCount: 20
    }) 
 */
var pager = {
    
    settings:{
        //当前页码
        currentPage:1,
        //总页数
        pageCount:0,
        //页大小
        pageSize: 20,
        //总条数
        recordCount:0,
        //页码导航显示数量
        navigatePages: 8,
        //要显示的页码集合
        navigatePageNums:[],
        //控件绑定的父元素
        pagerElement: "#pager-control",
        //是否固定显示首页
        fixedFristPage:true,
        //是否固定显示尾页
        fixedEndPage:true,
        //是否显示首页
        showFirstPage: true,
        //是否显示尾页
        showEndPage: true,
        //是否显示页码
        showNumberOfPages: true,
        //是否显示下一页
        showNextPage: true,
        //是否显示上一页
        showUpPage: true,
        //指定页码跳转
        showGo:true,
        //跳转事件
        togo:function(pageNum){
            console.info(pageNum)
        }
    },
    /**
     * 初始化分页控件
     * @param {*} settings 
     */
    init: function(settings){

        if(settings){
            $.extend(this.settings,settings)
        }

        if(! settings.navigatePageNums){
            this.calcNavigatePageNums()
        }
        
        this.buildPager()
        var self = this
        $(document).on('click',".pager a",function(){
            self.settings.currentPage = parseInt($(this).attr("page"))
            self.calcNavigatePageNums()
            self.buildPager()
            self.settings.togo(self.settings.currentPage)
 
        })
        $(document).on("keyup",".input-page-number",function(event){
            if (event.keyCode == "13") {
                self.settings.currentPage = parseInt($(this).val())
                self.calcNavigatePageNums()
                self.buildPager()
                self.settings.togo(self.settings.currentPage)
            }
        })
    },

    /**
     * 计算分页页码导航合理显示
     */
    calcNavigatePageNums: function(){ 
        if (this.settings.pageCount <= this.settings.navigatePages) {
            this.settings.navigatePageNums = []; 
            for(var i = 0; i < this.settings.pageCount; ++i) {
                this.settings.navigatePageNums[i] = i + 1;
            }
        } else {
            this.settings.navigatePageNums = [];
            var startNum = this.settings.currentPage - this.settings.navigatePages / 2;
            var endNum = this.settings.currentPage + this.settings.navigatePages / 2;
            if (startNum < 1) {
                startNum = 1;
                for(var i = 0; i < this.settings.navigatePages; i++) {
                    this.settings.navigatePageNums[i] = i+1;
                }
            } else if (endNum > this.settings.pageCount) {
                endNum = this.settings.pageCount;

                for(var i = this.settings.navigatePages - 1; i >= 0; i--) {
                    this.settings.navigatePageNums[i] = endNum--;
                }
            } else {
                for(var i = 0; i < this.settings.navigatePages; i++) {
                    this.settings.navigatePageNums[i] = i + startNum;
                }
            }
        } 
    },

    /**
     * 构造分页HTML
     */
    buildPager: function(){
        var pagerHTML = '<ul class="pager">'
        //首页
        if((this.settings.showFirstPage && this.settings.currentPage > 1) || this.settings.fixedFristPage ){
            pagerHTML += '<li><a href="javascript:;" class="page-first '+(this.settings.currentPage == 1 ? 'disabled' : '')+'" page="1">首页</a></li>'
        }
        //上一页
        if(this.settings.showUpPage && this.settings.currentPage >1){
            pagerHTML += '<li><a href="javascript:;" class="page-up" page="'+(this.settings.currentPage-1)+'">上一页</a></li>'
        }
        //页码
        if(this.settings.showNumberOfPages && this.settings.navigatePageNums.length > 0){
            for(var i=0;i<this.settings.navigatePageNums.length;i++){
                pagerHTML += '<li><a href="javascript:;" class="page-number '+(this.settings.currentPage == this.settings.navigatePageNums[i] ? 'selected' : '')+' " page="'+this.settings.navigatePageNums[i]+'">'+this.settings.navigatePageNums[i]+'</a></li>'
            }
        }
        //下一页
        if(this.settings.showNextPage && this.settings.currentPage < this.settings.pageCount){
            pagerHTML += '<li><a href="javascript:;" class="page-next" page="'+(this.settings.currentPage+1)+'">下一页</a></li>'
        }
        //尾页
        if((this.settings.showEndPage && this.settings.currentPage < this.settings.pageCount) || this.settings.fixedEndPage){
            pagerHTML += '<li><a href="javascript:;" class="page-end '+(this.settings.currentPage == this.settings.pageCount || this.settings.pageCount == 0 ? 'disabled' : '')+'" page="'+(this.settings.pageCount)+'">尾页</a></li>'
        }
        //直接跳转页码
        if(this.settings.showGo){
            pagerHTML += '<li> <input type="text" class="input-page-number"> </li>'
        }
        //总条数
        pagerHTML += '<li><span class="record-count">'+this.settings.recordCount+'</span> 条数据</li>'
        pagerHTML += '</ul>'
        $(this.settings.pagerElement).html(pagerHTML);
    }

}