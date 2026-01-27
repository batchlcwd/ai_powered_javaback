package com.mybasket.app.service.impl;

import com.mybasket.app.entity.FileMetaData;
import com.mybasket.app.repository.FileMetaDataRepo;
import com.mybasket.app.service.FileStorageService;
import lombok.RequiredArgsConstructor;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${app.files.upload.folder.products}")
    String productUploadFolder;

    private final FileMetaDataRepo fileMetaDataRepo;

    @Override
    public FileMetaData uploadFile(MultipartFile file) throws IOException {

        String fileName = file.getOriginalFilename();
        String storeName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        //folder
        Path uploadPath = Files.createDirectories(Paths.get(productUploadFolder));

        Path filePath = uploadPath.resolve(storeName);
        //copy files from file object to the file path
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        //file meta data;
        var fileMetadata = new FileMetaData();
        fileMetadata.setFileSize(file.getSize());
        fileMetadata.setOriginalName(file.getOriginalFilename());
        fileMetadata.setStoredName(storeName);
        fileMetadata.setFileType(file.getContentType());
        fileMetadata.setFileUrl(filePath.toString());
        fileMetadata.setStorageType("local");
        return fileMetaDataRepo.save(fileMetadata);
    }

    @Override
    public Resource loadFile(FileMetaData fileMetaData) throws MalformedURLException, BadRequestException {

        if(fileMetaData==null){
            throw new BadRequestException("file does not exits");
        }

        Path path = Paths.get(productUploadFolder).resolve(fileMetaData.getStoredName()).normalize();
        Resource resource= new UrlResource(path.toUri());
        if(!resource.exists()){
            throw new BadRequestException("File not found !!");
        }
        return resource;
    }


}
