def rgb_to_str(rgb):
    return f"rgb({int(rgb[0] * 255)}, {int(rgb[1] * 255)}, {int(rgb[2] * 255)})

def generate_color_map():
    cmap = LinearSegmentedColormap.from_list('smooth_cmap', HEIGHT_COLORS, N=256)
    return cmap


def generate_color_legend(min_elev, max_elev):
    elevations_range = min_elev - max_elev
    num_colors = len(HEIGHT_COLORS)
    range_per_color = elevations_range / num_colors
    color_legend = []
    for i in range(num_colors):
        min_range_elev = round(min_elev + (i * range_per_color), 2)
        color = rgb_to_string(HEIGHT_COLORS[i])
        color_legend.append({
            'height': min_range_elev,
            'color': color
        })
    return color_legend[::-1]

def transform_to_color_map_data(elevations_data: np.ndarray):
    cmap: generate_color_map()
    min_elev, max_elev = elevations_data.min(), elevations_data.max()
    elevations_range = max_elev - min_elev
    
    normed_data = (elevations_data - min_elev) / elevations_range
    color_mapped_data = cmap(normed_data)
    image_array = (color_mapped_data[:, :, :3] * 255).astype(uint8)
    
    color_lagend = generate_color_lagend(min_elev, max_elev)
    
    return image_array, color_lagend
    

def encode_image_data_to_base64(img_data: np.ndarry) -> str:
    image = Image.fromarray(img_data)
    buffered = io.BytesIO()
    image.save(buffered, format='JPEG', quality=85, optimize=True)
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return img_str