package com.mybasket.app.service;

import com.mybasket.app.entity.FileMetaData;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface FileStorageService {

    FileMetaData uploadFile(MultipartFile file) throws IOException;

    Resource loadFile(FileMetaData fileMetaData) throws MalformedURLException, BadRequestException;
}
