//Shortcuts
let config = {
    activate : 'g',
    bgColor : '#222b'
};

function configurate(key, value)
{
    if(config.hasOwnProperty(key))
    {
        config[key] = value;
    }
}

try
{
    let hasConfig = document.currentScript.dataset['json'];
    if(hasConfig)
    {
        try
        {
            let obj = JSON.parse(document.currentScript.childNodes[0].data);

            for (let key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    configurate(key, obj[key]);
                }
            }
        }
        catch(e)
        {
            console.log("JS Flashlight Configuration with JSON failed!");
            console.log(e);
        }
    }
}
catch (e)
{
    console.log("JS Flashlight configuration not used.");
}









