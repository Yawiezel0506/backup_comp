@router.post("windoe-elevations-heatmap")
async def window_elevation_heatmap(polygon: WindowPolygon):
    try:
        loop = asyncio.get_event_loop()
        img_data = await loop.run_in_executor(None, window_elevation_process, polygon)
        return img_data
    except Exception as e:
        logger.error(srr(e))