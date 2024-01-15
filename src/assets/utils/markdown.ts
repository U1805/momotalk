class myReExp {
    typeList: string[];
    reMdList: RegExp[];
    reHtmlList: RegExp[];
    strMdList: string[];
    strHtmlList: string[];
    length: any;

    constructor() {
        this.typeList = ['head1'];
        this.reMdList = [/^#\s+(.*)$/gm];
        this.reHtmlList = [/^<h1>(.*)<\/h1>$/gm];
        this.strMdList = ['# $1'];
        this.strHtmlList = ['<h1>$1</h1>'];
        this.length = this.typeList.length;
    }
    get methods() {
        return [['search', 'md2html', 'html2md'], this.typeList];
    }
    search(str:string) {
        for (let i = 0; i < this.length; i++) {
            if (str.search(this.reHtmlList[i]) !== -1) return true
        }
        return false
    }
    md2html(str:string) {
        for (let i = 0; i < this.length; i++) {
            str = str.replace(this.reMdList[i], this.strHtmlList[i])
        }
        return str
    }
    html2md(str:string) {
        for (let i = 0; i < this.length; i++) {
            str = str.replace(this.reHtmlList[i], this.strMdList[i])
        }
        return str
    }
}
// const re = new myReExp();
export { myReExp }