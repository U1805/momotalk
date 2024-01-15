import { talkHistory } from "../storeUtils/talkHistory";
import { Talk } from "./interface";

class myReExp {
    typeList: string[];
    reMdList: RegExp[];
    reHtmlList: RegExp[];
    strMdList: string[];
    strHtmlList: string[];
    length: any;

    constructor() {
        this.typeList = ['head1', 'head2', 'head3', 'bold', 'italic', 'bold italic', 'deleted', 'style'];
        this.reMdList = [/^#\s+(.*)$/gm, /^##\s+(.*)$/gm, /^###\s+(.*)$/gm, 
            /(\*\*)(.*?)(\*\*)/gm, /(\*)(.*?)(\*)/gm, /(\*\*\*)(.*?)(\*\*\*)/gm, /\~\~(.*?)\~\~/gm,
            /\[(.*)\]\((.*)\)/gm];
        this.strHtmlList = ['<h1>$1</h1>', '<h2>$1</h2>', '<h3>$1</h3>', 
            '<span style="font-weight:bolder;">$2</span>', '<span style="font-style:italic;">$2</span>',
            '<span style="font-style:italic;font-weight:bolder;">$2</span>','<del>$1</del>',
            '<span style="$1">$2</span>'];
        this.reHtmlList = [/^<h1>(.*)<\/h1>$/gm, /^<h2>(.*)<\/h2>$/gm, /^<h3>(.*)<\/h3>$/gm, 
            /<span style="font-weight:bolder;">(.*)<\/span>/gm, /<span style="font-style:italic;">(.*)<\/span>/gm, 
            /<span style="font-style:italic;font-weight:bolder;">(.*)<\/span>/gm, /<del>(.*)<\/del>/gm,
            /<span style="(.*)">(.*)<\/span>/gm];
        this.strMdList = ['# $1', '## $1', '### $1', '**$1**', '*$1*', '***$1***', '~~$1~~', '[$1]($2)'];
        this.length = this.typeList.length;
    }
    get methods() {
        return [['search', 'md2html', 'html2md'], this.typeList];
    }
    search(str:string) {
        for (let i = 0; i < this.length; i++) {
            if (str.search(this.reHtmlList[i]) !== -1) return "true"
        }
        return "false"
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
const re = new myReExp();

// 编辑markdown
const mdUtils = {
    checkFlag: (event:Event)=>{
        const element = event.target as HTMLElement
        return element.dataset.flag === 'true'
    },
    clicked: (event:Event, id: number)=>{
        const element = event.target as HTMLElement
        const talk:Talk = talkHistory.getTalkById(id)
        talkHistory.setTalkContent(id, re.html2md(talk.content))
        element.dataset.flag = 'false'
    },
    blured: (event:Event, id: number)=>{
        const element = event.target as HTMLElement
        const talk:Talk = talkHistory.getTalkById(id)
        talkHistory.setTalkContent(id, re.md2html(talk.content))
        element.dataset.flag = re.search(talk.content)
    }
}
export { mdUtils }