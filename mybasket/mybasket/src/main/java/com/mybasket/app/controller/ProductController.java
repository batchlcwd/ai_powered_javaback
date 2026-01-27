package com.mybasket.app.controller;


import com.mybasket.app.entity.FileMetaData;
import com.mybasket.app.dto.PageResponse;
import com.mybasket.app.dto.ProductDto;
import com.mybasket.app.entity.Product;
import com.mybasket.app.service.FileStorageService;
import com.mybasket.app.service.ProductService;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

//@Controller
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {


    private final ProductService productService;

    private final FileStorageService fileStorageService;


    //Resource : Product

    //to get all products
    //@RequestMapping(method = RequestMethod.GET)
    // @ResponseBody
    @GetMapping
    public PageResponse<Product> getProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam("sortBy") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        return productService.getAll(page, size, sortBy, sortDir);
    }

    //get single  product
    //@RequestMapping(value = "/{productId}", method = RequestMethod.GET)
    //@ResponseBody
    //uri path variable
    @GetMapping("/{productId}")
    public Product getSingleProduct(@PathVariable("productId") Long productId) {
        return productService.get(productId);
    }

    // 10 methods
    //create product:
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto productdto) {

        //validations ke logic manual
//        if(product.getTitle().isBlank()){
//            return new
//        }


//        System.out.println("Product name : "+product.getTitle());
//        System.out.println("Creating product");
        //validations-- actual validations
        ProductDto savedEntity = productService.createProduct(productdto);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    // update  products:
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId, @RequestBody Product product) {
        // fetch the existing product
        Product savedProduct = productService.udpateProduct(productId, product);
        return new ResponseEntity<>(savedProduct, HttpStatus.OK);
    }

    //delete api for product:
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId") Long productId) {
        productService.delete(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    //controller method to upload product image
    @PostMapping("/{productId}/image")
    public ResponseEntity<FileMetaData> uploadProductImage(
            @PathVariable("productId") Long productId,
            @RequestParam("productImage") MultipartFile file
    ) throws IOException {
//        System.out.println(file.getOriginalFilename());

        Product product = productService.get(productId);
        FileMetaData fileMetaData = fileStorageService.uploadFile(file);
        product.setImage(fileMetaData);

//        image validation

        System.out.println(file.getContentType());

        if (!file.getContentType().equalsIgnoreCase("image/png") && !file.getContentType().equalsIgnoreCase("image/jpeg")) {
            throw new BadRequestException("Invalid file type !");
        }


        // file upload code
        productService.udpateProduct(productId, product);
        return ResponseEntity.ok(fileMetaData);
    }


    @GetMapping("/{productId}/image")
    public ResponseEntity<Resource> serveFile(
            @PathVariable("productId") Long productId
    ) throws MalformedURLException, BadRequestException {
        Product product = productService.get(productId);
        FileMetaData fileMetaData = product.getImage();

        Resource resource = fileStorageService.loadFile(fileMetaData);

        String contentType = fileMetaData.getFileType();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\""
                )
                .body(resource);

    }

}
