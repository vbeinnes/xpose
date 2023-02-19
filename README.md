

# xpose
Xpose is a tool to help calculate long exposure times in photography, especially usefull when using ND-filters or shooting film when you have to take reciprocity failure into accpunt.


##How it works##
First you have to measure the amount of light in your scene with the light meter in your camera (or an external light meter), and set the given values into the *metered settings* section. Then, by setting your preferred settings for the actual exposure in the *new settings* section, you will be given an appropriate exposure time (shutter speed) for your long exposure picture.

If you alredy have a spesific exposure time in mind, you can tweak the other settings until it matches.


##Math##
EV (Exposure value) corresponds to the amount of light in your scene. The higher the number, the brighter the scene. The EV is calculated as follows, using the aperture value *f*, the shutter speed *ss*, and the *iso* from the metered settings:

    EV = Math.log2(f**2) + Math.log2(1/ss) - Math.log2(iso/100)

The calulated long exposure time is calculated as follows, using the aperture value *f2* and the *iso2* of your preferred long exposure settings, and the measured *EV* from the metered settings:

    exposureTime = (25 * (f2**2))/(2**(EV-2)*iso2)

If using an ND-filter when doing the long exposure, the exposure time is doubled for each stop of the ND-filter:

    exposureTimeNd = exposureTime * (2 ** ndValue)


If shooting film, the calculated exposure time has to be further extended. Digital camera sensors have a contant sensitivity to light (which correlates to a reciprocity factor of 1), and an exposure time of 2 minute captures double the amount of light as a 1 minute expoure. Film however, becomes exponentially less sensitive to light the longer it is exposed to it. Each film stock has a different reciprocity factor, which is used to calculate how much the exposure time has to be extended compared to a using digital camera.

    ExposureTimeReciprocity = (exposureTime ** reciprocityFactor)



