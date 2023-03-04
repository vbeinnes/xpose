

# xpose
Xpose is a tool designed to help calculate long exposure times in photography. It is particularly usefull when using ND-filters, or when shooting film when you have to take reciprocity failure into account.
<br/>
<br/>
-- Created by Vebjørn Beinnes december 2022, and sporadically updated.
<br/>
<br/>
<br/>

## How it works
First, you need to measure the amount of light in your scene using a light meter in your camera or an external light meter. Then, you set the measured values into the *metered settings* section of Xpose. Next, you set your preferred settings for the actual exposure in the *new settings* section. Based on these values, Xpose calculates an appropriate exposure time (shutter speed) for your long exposure shot. If you already have a specific exposure time in mind, you can tweak the other settings until the app displays that particular exposure time.
<br/>
<br/>
<br/>


## Math for nerds
EV (Exposure value) corresponds to the amount of light in your scene. The higher the number, the brighter the scene. The EV is calculated as follows, using the aperture value *f*, the shutter speed *ss*, and the *iso* from the metered settings:

    EV = Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100)

<br/> Based on the *EV* value from the metered settings, and the aperture value *f2* and *iso2* of your preferred long exposure settings, Xpose calculates an appropriate exposure time using the following formula:

    exposureTime = (25 * (f2**2))/(2**(EV-2)*iso2)

<br/> If you are using an ND-filter for the long exposure, the exposure time is doubled for each stop of the ND-filter (given that the ND-filter was not used for metering the scene):

    exposureTimeNd = exposureTime * (2 ** ndValue)

<br/> If you are shooting on film, exposure times longer than one second needs to be further extended. Unlike digital camera sensors, film has a variable sensitivity to light. The longer it is exposed to light, the less sensitive it becomes. Each film stock has a different reciprocity factor that takes this into account. You will usually find the reciprocity factor on the packaging for the film stock you are using. Xpose uses this factor to calculate the extended exposure time, which is given by the following formula:

    ExposureTimeReciprocity = (exposureTime ** reciprocityFactor)



