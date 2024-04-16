using Microsoft.AspNetCore.Mvc;
//using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Vision.V1;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Storage.V1;
using System.Net;
using System;

namespace image_search.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageSearchController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly StorageClient _storageClient;
        private readonly string _bucketName = "images_for_vision_api";
        public ImageSearchController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _storageClient = StorageClient.Create();
        }
        [HttpPost("search")]
        public async Task<ActionResult<List<byte[]>>> SearchImages([FromBody] string searchQuery)
        {
            try
            {
                List<byte[]> matchedImagesData = new List<byte[]>();
                var visionClient = ImageAnnotatorClient.Create();
                var objects = _storageClient.ListObjects(_bucketName);

                foreach (var obj in objects)
                {
                    var imageObject = await _storageClient.GetObjectAsync(_bucketName, obj.Name);

                    MemoryStream imageStream = new MemoryStream();
                    imageObject.MediaLink = imageObject.SelfLink; // might be unnecessary
                    await _storageClient.DownloadObjectAsync(imageObject, imageStream);
                    imageStream.Position = 0;

                    var response = await visionClient.DetectLabelsAsync(Image.FromStream(imageStream));

                    if (response.Any(label => label.Description.ToLower().Contains(searchQuery.ToLower())))
                    {
                        byte[] imageData = imageStream.ToArray();
                        matchedImagesData.Add(imageData);
                    }
                }

                return matchedImagesData;
            }
            catch (Exception ex)
            { 
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

    }
}
