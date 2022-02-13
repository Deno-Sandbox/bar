export class textAnimation {

    //counter part
    public async count(max, interval, additonal?: string) {
        await new Promise(resolve => {
            let num = 1;
            const enc = (s: string) => new TextEncoder().encode(s);
            if(!additonal){
                additonal = ""
            } else {
                additonal = additonal + " "
            }
            let ind = setInterval(async () => {
                await Deno.stdout.write(enc(`${additonal}${num++}\r`))
                if(num == max){
                    clearInterval(ind)
                    console.log()
                    resolve(true)
                }
            }, interval);
        })
    }

    // bar part
    public async bar(max, interval, additonal?: string) {
        let num = 0
        if(!additonal){
            additonal = ""
        } else {
            additonal = additonal + " "
        }
        const enc = (s: string) => new TextEncoder().encode(s);
        await new Promise(resolve => {
            const intId = setInterval(async () => {
                await Deno.stdout.write(enc("\r"+additonal+"|"));
                for (let i = 0; i < max; i++) {
                    i < num ?
                        await Deno.stdout.write(enc("█")) : await Deno.stdout.write(enc("░"));
                }
                await Deno.stdout.write(enc(`| ${num}/${max}`));
                if (num == max) {
                    await Deno.stdout.write(enc("\n"));
                    clearInterval(intId);
                    resolve(true)
                } else {
                    num++;
                }
            }, interval);
        })
    }

    // bar with listener upgrade
    private barDB = []
    public async barWithListener(max, barName, additonal?: string) {
        let num = 0
        if(!additonal){
            additonal = ""
        } else {
            additonal = additonal + " "
        }
        this.barDB.push({
            name: barName,
            max: max,
            next: false,
            forceEnd: false
        })
        const enc = (s: string) => new TextEncoder().encode(s);
        await new Promise(async resolve => {
            let pass = true
            while (true){
                await Deno.stdout.write(enc("\r"+additonal+"|"));
                for (let i = 0; i < max; i++) {
                    i < num ?
                        await Deno.stdout.write(enc("█")) : await Deno.stdout.write(enc("░"));
                }
                await Deno.stdout.write(enc(`| ${num}/${max}`));
                if (num == max) {
                    await Deno.stdout.write(enc("\n"));
                    pass = false
                    resolve(true)
                    break
                } else {
                    num++;
                }
                await this.waitNext(barName)
            }
        })
    }

    public next(name){
        let tmp = this.barDB.find(x => x.name == name)
        if(tmp){
            tmp.next = true
        }
    }

    public forceEnd(name){
        let tmp = this.barDB.find(x => x.name == name)
        if(tmp){
            tmp.next = true
            tmp.forceEnd = true
        }
    }

    private waitNext(name){
        return new Promise(resolve => {
            const intId = setInterval(() => {
                let tmp = this.barDB.find(x => x.name == name)
                if(tmp){
                    if(tmp.next){
                        clearInterval(intId)
                        if(!tmp.forceEnd){
                            tmp.next = false
                        }
                        resolve(true)
                    }
                } else {
                    clearInterval(intId)
                    resolve(true)
                }
            }, 10)
        })
    }


}